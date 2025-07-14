export interface RequestInterface {
    id: string;
    user: {
        name: string;
        email: string;
        employeeId: string;
        department: string;
    };
    hospitalId: string;
    dateRequested: string;
    dateApproved: string | null;
    status: 'pending' | 'approved' | 'rejected' | 'under_review';
    description: string;
}