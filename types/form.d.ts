
declare interface SelectProps {
    label?: string
    description?: string
    value: string
    placeholder?: string
    defaultValue?: string
    isLoading?: boolean
    name?: string
    onChange: (value: string) => void
    data: DataItem[]
}

declare interface MultiSelectInterface {
    options: SelectOption[]
    selected: SelectOption[]
    label: string
    onChange: (selected: SelectOption[]) => void
}