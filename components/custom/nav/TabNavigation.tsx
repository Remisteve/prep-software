import { Activity, LucideProps } from 'lucide-react'
import { useSession } from 'next-auth/react'
import React, { Dispatch, ForwardRefExoticComponent, RefAttributes, SetStateAction } from 'react'
import UserProfileDropdown from '../Users/UserProfileDropdown'

export interface ListItemsInterface {
    id: string,
    label: string,
    icon: ForwardRefExoticComponent<Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>>
}

const TabNavigation = ({ listItems, activeTab, setActiveTab }: {
    listItems: ListItemsInterface[],
    activeTab: string,
    setActiveTab: Dispatch<SetStateAction<string>>
}) => {
    const { data: session, status } = useSession()

    return (
        <div className="bg-white rounded-lg mb-8">
            <div className="border-b border-slate-100 px-8">
                <div className='flex justify-between items-center'>
                    <div
                        className='flex items-center space-x-2'
                    >
                        <div className="flex items-center space-x-4 mr-8">
                            <Activity className="h-8 w-8 text-blue-600" />
                            <h1 className="text-xl font-bold text-slate-900">HealthCare</h1>
                        </div>
                        <nav className="-mb-px flex space-x-8 px-6">
                            {listItems.map(({ id, label, icon: Icon }) => (
                                <button
                                    key={id}
                                    onClick={() => setActiveTab(id)}
                                    className={`py-4 px-1 border-b-2 font-medium text-sm flex items-center space-x-2 ${activeTab === id
                                        ? 'border-blue-500 text-blue-600'
                                        : 'border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300'
                                        }`}
                                >
                                    <Icon className="h-4 w-4" />
                                    <span>{label}</span>
                                    {id === 'appointments' && (
                                        <span className="ml-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                                            0
                                        </span>
                                    )}
                                </button>
                            ))}
                        </nav>
                    </div>
                    <UserProfileDropdown user={session?.user} isLoading={status === 'loading' ? true : false} />
                </div>
            </div>
        </div>
    )
}

export default TabNavigation