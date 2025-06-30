export const getStatusColor = (status: string) => {
    switch (status) {
        case 'active':
        case 'completed':
        case 'confirmed':
        case 'in_stock':
            return 'bg-green-100 text-green-800';
        case 'pending':
        case 'processing':
        case 'low_stock':
            return 'bg-yellow-100 text-yellow-800';
        case 'inactive':
        case 'flagged':
        case 'urgent':
        case 'critical_low':
            return 'bg-red-100 text-red-800';
        case 'pending_review':
            return 'bg-teal-100 text-teal-800';
        default:
            return 'bg-gray-100 text-gray-800';
    }
};
