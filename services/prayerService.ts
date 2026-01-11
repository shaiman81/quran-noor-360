
import { Coordinates, CalculationMethod, PrayerTimes, Madhab, Qibla } from 'adhan';
import { PrayerConfig } from '../types';

export const getPrayerTimes = (latitude: number, longitude: number, config: PrayerConfig) => {
    const coordinates = new Coordinates(latitude, longitude);
    const date = new Date();
    
    // Select Method
    let params;
    switch(config.calculationMethod) {
        case 'MWL': params = CalculationMethod.MuslimWorldLeague(); break;
        case 'Egyptian': params = CalculationMethod.Egyptian(); break;
        case 'Karachi': params = CalculationMethod.Karachi(); break;
        case 'UmmAlQura': params = CalculationMethod.UmmAlQura(); break;
        case 'Dubai': params = CalculationMethod.Dubai(); break;
        case 'Moonsighting': params = CalculationMethod.MoonsightingCommittee(); break;
        case 'NorthAmerica': params = CalculationMethod.NorthAmerica(); break;
        case 'Tehran': params = CalculationMethod.Tehran(); break;
        default: params = CalculationMethod.Karachi(); // Fallback
    }

    // Set Asr Method
    params.madhab = config.madhab === 'hanafi' ? Madhab.Hanafi : Madhab.Shafi;

    const prayerTimes = new PrayerTimes(coordinates, date, params);
    return prayerTimes;
};

export const getQiblaDirection = (latitude: number, longitude: number): number => {
    const coordinates = new Coordinates(latitude, longitude);
    return Qibla(coordinates);
};
