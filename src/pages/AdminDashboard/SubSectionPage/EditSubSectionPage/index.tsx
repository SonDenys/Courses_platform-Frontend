import { Button, Space } from "antd";
import Layout, { Content } from "antd/lib/layout/layout";
import { useEffect, useState } from "react";
import ReactQuill from "react-quill";
import { useParams } from "react-router-dom";
import InnerPageHeader from "../../../../components/InnerPageHeader";






export default function EditSubSectionPage(props: any) {
    const [data, setData] = useState();
    const { id, course_id, section_id, subsection_id } = useParams()

    const handleChange = (value: any) => {
        setData(value);
    }

    useEffect((): any => {
        // setData()
    }, [])

    const handleSave = async () => {
        console.log("Save")

        // save data
    }

    const handleCancel = () => {
        console.log("Cancel")
        // save cancel
    }

    const handlePreview = () => {
        console.log("Preview")
        // save cancel
    }

    const extra = [
        <Button onClick={handlePreview}>Preview</Button>,
        <Space direction="horizontal">    </Space>,
        <Button onClick={handleCancel}>Cancel</Button>,
        <Button onClick={handleSave}>Save</Button>,
    ]

    return (
        <>
        <InnerPageHeader goBack  extra={extra}/>
        <Layout>
            <Content style={{height: "900px"}}>
                <ReactQuill  defaultValue={data} className="ml-2 mr-2 h-80 rounded-sm" onChange={handleChange}/>
            </Content>
        </Layout>

        </>
    )

}