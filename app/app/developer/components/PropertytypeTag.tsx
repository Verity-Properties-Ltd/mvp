import React from 'react';

type PropertyType = 'Apartment Building' | 'Landed Property' | 'Commercial Space' | 'Duplex';

const typeConfig: Record<PropertyType, { text: string; color: string }> = {
    'Apartment Building': { text: 'Apartment Building', color: 'text-[#7C3AED]' },
    'Landed Property': { text: 'Landed Property', color: 'text-[#15803D]' },
    'Commercial Space': { text: 'Commercial Space', color: 'text-[#0D7A5F]' },
    'Duplex': { text: 'Duplex', color: 'text-[#D97706]' },
};

const PropertyTypeTag = ({ type }: { type: PropertyType }) => {
    const config = typeConfig[type] ?? { text: type, color: 'text-[#6B7280]' };
    return (
        <span className={`text-sm font-medium ${config.color}`}>
            {config.text}
        </span>
    );
};

export default PropertyTypeTag;
export type { PropertyType };