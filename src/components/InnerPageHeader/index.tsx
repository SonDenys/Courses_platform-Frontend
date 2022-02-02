import React from "react";
// import { useHistory } from "react-router-dom";
import { PageHeader, Button, Descriptions, Avatar, Space, ConfigProvider, Tag, Typography } from 'antd';

import { useTranslation } from "react-i18next";
import i18n from "i18next";
import OrganizationSelect from "../OrganizationSelect";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { ArrowLeftIcon } from "@heroicons/react/solid";
import { useNavigate } from "react-router-dom";


export interface InnerPageHeaderProps {
    title?: any
    onCreateClick?: Function
    onRefreshClick?: Function
    onChangeOrganization?: Function
    organizationReadOnly?: true | false
    // doGoBack?: boolean
    goBack?: any
    extra?: Array<any>
    tagName?: string
    tagColor?: string
    content?: any
}

const { Paragraph } = Typography;

const customizeRenderEmpty = () => (
    <span>{i18n.t("no_data_found")} </span>
);
export default function InnerPageHeader(props: InnerPageHeaderProps) {
    const { t } = useTranslation()
    const navigate  = useNavigate();

    let extra: any = props.extra || [
        <OrganizationSelect key={"header_000"} onChange={props.onChangeOrganization} readOnly={props.organizationReadOnly} />,
        <Button key={`header_001`} type="ghost" size="middle" onClick={props.onRefreshClick as any} >
            {t("refresh")}
        </Button>,
        < Button key={`header_002`} type="ghost" size="middle" onClick={props.onCreateClick as any} >
            {t("create")}
        </Button>
    ]

    // const goBack = props.goBack === true? ()=> navigate(-1) : undefined
    const goBack = ()=> navigate(-1) 


    return (<>
        {/* <ConfigProvider renderEmpty={customizeRenderEmpty} > */}
        {/* <PageHeader className="site-page-header-ghost-wrapper" */}
        <PageHeader
            style={{ height: "80px !important", paddingRight: "12px" }}
            
            ghost={false}
            //onBack={props.goBack}

            title={props.title}
            // subTitle="This is a subtitle"
            extra={extra as any}
            onBack={props.goBack===true ? goBack: undefined}
            backIcon={<ArrowLeftIcon className="h-5 w-5"/>}    
        >

            { /*
                props.content &&
                    <Paragraph>
                        {props.content}
                    </Paragraph>         
                    */      
            }

        </PageHeader>
        {/* </ConfigProvider> */}
    </>

    )
}

