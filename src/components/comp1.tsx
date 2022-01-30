import { InputNumber, Select, Space, Cascader, Input } from 'antd';
import { SettingOutlined } from '@ant-design/icons';

const { Option } = Select;

const selectBefore = (
    <Select defaultValue="add" style={{ width: 60 }}>
        <Option value="add">+</Option>
        <Option value="minus">-</Option>
    </Select>
);
const selectAfter = (
    <Select defaultValue="USD" style={{ width: 60 }}>
        <Option value="USD">$</Option>
        <Option value="EUR">€</Option>
        <Option value="GBP">£</Option>
        <Option value="CNY">¥</Option>
    </Select>
);


export default function Comp1(){
    return (
        <Space direction="vertical">
            <InputNumber addonBefore="+" addonAfter="$" defaultValue={100} />
            <InputNumber addonBefore={selectBefore} addonAfter={selectAfter} defaultValue={100} />
            <InputNumber addonAfter={<SettingOutlined />} defaultValue={100} />
            <InputNumber
                addonBefore={<Cascader placeholder="cascader" style={{ width: 150 }} />}
                defaultValue={100}
            />
            <Input ></Input>
        </Space>
    )
}