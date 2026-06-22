import React from 'react';

type StatusType = 'Verified' | 'Pending' | 'Flagged' | 'Under Review';

const statusConfig: Record<StatusType, { bg: string; dot: string; text: string }> = {
    Verified: {
        bg: 'bg-[#DCFCE7]',
        dot: 'bg-[#15803D]',
        text: 'text-[#15803D]',
    },
    Pending: {
        bg: 'bg-[#FEF3C7]',
        dot: 'bg-[#D97706]',
        text: 'text-[#D97706]',
    },
    Flagged: {
        bg: 'bg-[#FEE2E2]',
        dot: 'bg-[#DC2626]',
        text: 'text-[#DC2626]',
    },
    'Under Review': {
        bg: 'bg-[#EBF2FA]',
        dot: 'bg-[#2A5298]',
        text: 'text-[#2A5298]',
    },
};

const StatusBadge = ({ status }: { status: StatusType }) => {
    const config = statusConfig[status];
    return (
        <span
            className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold ${config.bg} ${config.text}`}
        >
            <span className={`w-1.5 h-1.5 rounded-full ${config.dot}`} />
            {status}
        </span>
    );
};

export default StatusBadge;
export type { StatusType };