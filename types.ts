// ─── Types ────────────────────────────────────────────────────────────────────
export interface TitleEntry {
    id: string;
    titleType: string;
    ownerName: string;
    file: File | null;
}

export interface FormData {
    propertyName: string;
    address: string;
    gpsLat: string;
    gpsLon: string;
    lga: string;
    state: string;
    propertyType: string;
    bedrooms: string;
    bathrooms: string;
    sizeSqft: string;
    description: string;
    titles: TitleEntry[];
    photos: File[];
}

export interface CsvRow {
    address: string;
    lga: string;
    property_type: string;
    title_type: string;
    owner_name: string;
    gps_lat: string;
    gps_lon: string;
    status: 'valid' | 'error';
    error?: string;
}
