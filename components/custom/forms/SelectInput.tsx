import React from 'react'
import {
    Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue,
} from '@/components/ui/select';
import { Loader2 } from 'lucide-react';


function SelectInput({
    label = '',
    placeholder = '',
    data = [],
    onChange,
    value,
    description,
    name,
    defaultValue,
    isLoading
}: SelectProps) {
    return (
        <div className="w-full flex space-y-1 flex-col">
            <div>
                {label && (
                    <p className="font-medium text-slate-900 capitalize text-[14px] ">{label}</p>
                )}

                {description && (
                    <p className=" text-[12px] text-muted-foreground">
                        {description}
                    </p>
                )}
            </div>

            <Select
                onValueChange={(e) => {
                    onChange(e);
                }}
                value={value}
                name={name}
            >
                <SelectTrigger className="w-full shadow-none focus:ring-1 focus:ring-slate-200 border-slate-200 p-4 outline-none rounded-lg focus-within:ring-1 focus-within:ring-slate-200">
                    <SelectValue placeholder={placeholder} className="text-slate-500 text-[12px]" />
                </SelectTrigger>
                <SelectContent className="shadow-none bg-white">
                    {isLoading ? <SelectItem value='loading'>
                        <Loader2 />
                    </SelectItem> : data.length === 0
                        ? (
                            <SelectItem value="No Data">No Data</SelectItem>
                        )
                        : (
                            <>
                                {data.map((item) => (
                                    <SelectItem key={item.id} value={item.id} className="capitalize">
                                        {item.label}
                                    </SelectItem>
                                ))}
                            </>
                        )}
                </SelectContent>
            </Select>
        </div>
    );
}

export default SelectInput;