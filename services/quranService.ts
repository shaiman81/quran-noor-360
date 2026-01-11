
import { Surah, Ayah } from '../types';

const BASE_URL = 'https://api.alquran.cloud/v1';

// Switch to commonly available editions to ensure stability
// quran-uthmani: Standard Arabic
// en.sahih: Sahih International (English)
// ur.junagarhi: Muhammad Junagarhi (Urdu) - often more reliable endpoint than jalandhry
const EDITIONS = 'quran-uthmani,en.sahih,ur.junagarhi';

interface ApiResponse {
    code: number;
    status: string;
    data: {
        edition: { identifier: string; name: string; language: string; };
        ayahs: { number: number; text: string; numberInSurah: number; surah: { number: number; name: string; englishName: string; } }[];
    }[];
}

interface JuzResponse {
    code: number;
    status: string;
    data: {
        edition: { identifier: string; };
        ayahs: { number: number; text: string; numberInSurah: number; surah: { number: number; name: string; englishName: string; } }[];
    }[];
}

const fetchWithRetry = async (url: string, retries = 3, backoff = 300): Promise<Response> => {
    try {
        const response = await fetch(url);
        if (!response.ok) {
            // If 500 or 503, retry
            if (response.status >= 500 && retries > 0) {
                console.warn(`API ${response.status} Error. Retrying in ${backoff}ms...`);
                await new Promise(resolve => setTimeout(resolve, backoff));
                return fetchWithRetry(url, retries - 1, backoff * 2);
            }
            throw new Error(`API Error: ${response.status} ${response.statusText}`);
        }
        return response;
    } catch (error) {
        if (retries > 0) {
            console.warn(`Network error. Retrying in ${backoff}ms...`);
            await new Promise(resolve => setTimeout(resolve, backoff));
            return fetchWithRetry(url, retries - 1, backoff * 2);
        }
        throw error;
    }
};

export const fetchSurah = async (surahNumber: number): Promise<Surah | null> => {
    const cacheKey = `quran_surah_${surahNumber}_v2`; // Updated cache key version
    
    try {
        // 1. Try Cache
        const cached = localStorage.getItem(cacheKey);
        if (cached) {
            try {
                return JSON.parse(cached) as Surah;
            } catch (e) {
                localStorage.removeItem(cacheKey);
            }
        }

        // 2. Fetch from API with Retry
        console.log(`Fetching Surah ${surahNumber}...`);
        const response = await fetchWithRetry(`${BASE_URL}/surah/${surahNumber}/editions/${EDITIONS}`);
        const json: ApiResponse = await response.json();
        
        if (json.code !== 200 || !json.data || !Array.isArray(json.data) || json.data.length < 3) {
            console.error('Invalid API Data Structure:', json);
            throw new Error('Invalid API data structure');
        }

        // 3. Merge Editions
        const arabicData = json.data[0];
        const englishData = json.data[1];
        const urduData = json.data[2];

        // Validation
        if (!arabicData.ayahs || arabicData.ayahs.length === 0) {
            throw new Error('No Ayahs found in response');
        }

        // Defensive Access to Metadata
        const firstAyah = arabicData.ayahs[0];
        if (!firstAyah.surah) {
            throw new Error('Surah metadata missing in response');
        }

        const meta = firstAyah.surah;

        const mergedAyahs: Ayah[] = arabicData.ayahs.map((ayah, index) => {
            const enText = englishData?.ayahs?.[index]?.text || '';
            const urText = urduData?.ayahs?.[index]?.text || '';
            
            return {
                number: ayah.numberInSurah,
                text: ayah.text,
                translation: {
                    en: enText,
                    ur: urText,
                }
            };
        });

        const fullSurah: Surah = {
            number: meta.number,
            name: meta.name,
            englishName: meta.englishName,
            englishNameTranslation: '', 
            numberOfAyahs: mergedAyahs.length,
            revelationType: '', 
            ayahs: mergedAyahs
        };

        // 4. Save to Cache
        try {
            localStorage.setItem(cacheKey, JSON.stringify(fullSurah));
        } catch (e) {
            // Storage full, ignore
        }

        return fullSurah;

    } catch (error) {
        console.error(`Error fetching Surah ${surahNumber}:`, error);
        return null;
    }
};

export const fetchJuz = async (juzNumber: number): Promise<any[] | null> => {
    const cacheKey = `quran_juz_${juzNumber}_v2`;

    try {
        const cached = localStorage.getItem(cacheKey);
        if(cached) {
            try {
                return JSON.parse(cached);
            } catch (e) {
                localStorage.removeItem(cacheKey);
            }
        }

        console.log(`Fetching Juz ${juzNumber}...`);
        const response = await fetchWithRetry(`${BASE_URL}/juz/${juzNumber}/editions/${EDITIONS}`);
        const json: JuzResponse = await response.json();
        
        if (json.code !== 200 || !json.data || !Array.isArray(json.data) || json.data.length < 3) {
            throw new Error('Invalid API data');
        }

        const arabic = json.data[0].ayahs;
        const english = json.data[1].ayahs;
        const urdu = json.data[2].ayahs;

        // Group by Surah for display
        const grouped: any[] = [];
        let currentSurahId = -1;
        let currentSurahObj: any = null;

        arabic.forEach((ayah, idx) => {
            // Defensive check for surah object
            if (!ayah.surah) {
                console.warn(`Ayah ${ayah.number} missing surah metadata`);
                return;
            }

            if (ayah.surah.number !== currentSurahId) {
                if (currentSurahObj) grouped.push(currentSurahObj);
                currentSurahId = ayah.surah.number;
                currentSurahObj = {
                    surah: ayah.surah,
                    ayahs: []
                };
            }

            const enText = english?.[idx]?.text || '';
            const urText = urdu?.[idx]?.text || '';

            currentSurahObj.ayahs.push({
                number: ayah.numberInSurah,
                text: ayah.text,
                translation: {
                    en: enText,
                    ur: urText
                }
            });
        });
        if (currentSurahObj) grouped.push(currentSurahObj);

        try {
            localStorage.setItem(cacheKey, JSON.stringify(grouped));
        } catch (e) {
            // Storage full
        }

        return grouped;

    } catch (error) {
        console.error(`Error fetching Juz ${juzNumber}:`, error);
        return null;
    }
}
