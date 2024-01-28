import { Select } from 'antd';

export default function StudentSelectEntry(props) {
    
    const onChange = (value) => {
        console.log(`selected ${value}`);
        props.selected(value)
    };

    const onSearch = (value) => {
        console.log('search:', value);
    };
    
    // Filter `option.label` match the user type `input`
    const filterOption = (input, option) =>
        (option?.label ?? '').toLowerCase().includes(input.toLowerCase());

    const data = props.item
        .filter(item => item.entry)
        .map(d => ({
            value: d.title,
            label: d.title,
            key : d.id
        }));

    return (
        <Select style={{ width: 'auto' }}
            showSearch
            placeholder="Select an event"
            optionFilterProp="children"
            onChange={onChange}
            onSearch={onSearch}
            filterOption={filterOption}
            options={data}
        />
    )
};