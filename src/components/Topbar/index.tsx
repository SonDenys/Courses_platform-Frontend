import React, { useEffect, useState } from 'react'
import { Badge, Button, Col, Row, Space } from 'antd'
// import ProjectManagement from './ProjectManagement'
// import ProfileMenu from './ProfileMenu'
// import './style.scss';

import { Layout, Menu, Select } from "antd";

import { useTranslation } from 'react-i18next';

import { atom, useRecoilState, useRecoilValue } from 'recoil';
// import { companyDataState, selectedCompanyState, activeLanguageState, activeUserState, scopesState, notificationMessageState, selectedStoreState } from "../../_GlobalStates";
// import { companyDataState, selectedCompanyState, activeLanguageState, activeUserState, notificationMessageState, selectedStoreState, reset_global_scopes } from "../../_GlobalStates";
import { activeLanguageState, activeUserState, notificationMessageState, reset_global_scopes } from "../../_GlobalStates";
import { TopBarModel } from './models';
import { getPayloadValue, getScopes, getTokenCache, resetTokenCache, setActiveLanguageCache } from '../../Auth';
import { setAccessToken } from 'axios-jwt';

// import { fasBell } from "@fortawesome/react-fontawesome";

import logo from '../../resources/smart_logo.png';
// import logo2 from '../../resources/logo_admin_panel.png'
import './style.css';

import { set_selection_data_loaded } from '../../_GlobalStates/rbac';
import konsole from '../../konsole';
import { LoadingSpinner } from '../LoadingSpinner';
import { S } from '../../utils';
import { writeToRecoilState } from '../../_GlobalStates/hooks';
// import { APP_STAGE } from '../../Params';
import { Navigate, useNavigate } from 'react-router-dom';
import useBreakpoint from 'antd/lib/grid/hooks/useBreakpoint';

const { Sider, Header, Footer, Content } = Layout;
const { Option } = Select


const APP_STAGE = "dev"

let ACTIVE_USER_LOADED


const selectable_langauges = ['ja', 'en']

export default function TopBar(props: TopBarModel) {
    const { t, i18n } = useTranslation()
    const [activeUser, setActiveUser] = useRecoilState(activeUserState)
    const [activeLanguage, setActiveLanguage] = useRecoilState(activeLanguageState)
    // const [scopes, setScopes] = useRecoilState(scopesState)
    const scopes = getScopes()
    const notificationMessage = useRecoilValue(notificationMessageState)
    const [rootRedirect, setRootRedirect] = useState(false)
    const { xs, sm, md, lg, xl, xxl } = useBreakpoint();
    const navigate = useNavigate();

    const count = notificationMessage.length

    const username = getPayloadValue("username")
    const email = getPayloadValue("email")
    const display_name = getPayloadValue("display_name")
    // if (username) {
    const current_scope = getScopes()

    const scopeToShow: string = "admin" // getPayloadValue('scopes')


    useEffect(() => {
        setActiveUser("Default user");
        // setActiveUser((display_name || username) || email)
    }, [display_name, email, username])


    const handleSignout =  () => {
            resetTokenCache() // must be reset before setScores
            set_selection_data_loaded(false)
            // setScopes("")
            reset_global_scopes()
            // setSelectedCompany({})
            // setSelectedStore({})
            // setRootRedirect(true)
            // history.replace("/")
            // writeToRecoilState(scopesState, "")
            // history.go(0)
            // history.replace("/empty")
            navigate("/");

            // setTimeout(() => {
            //     history.replace("/");
            // }, 10);

        }

    if (rootRedirect) {
        return <Navigate to="/" />
    }

    return (
        <div  className=' !shadow-xl !shadow-black'>
            <Header className={"header top_bar !bg-blue-900 !text-gray-300 !shadow-xl !shadow-black"} style={{ height: "70px" }} >
                <Row align="middle" >
                    <Col span={6}>
                        <img className='h-12' src="/AeonX_logo_white.png" alt="" />
                        {/* <div className={"aeonx-logo"} > */}
                        {/* <img className={"aeonx-logo"} src="smart_logo.png" alt="" /> */}
                        {/* <img className={"aeonx-logo"} src={logo} alt="" style={{height: "55px", width: "auto"}} /> */}
                        {/* <img src={logo2} alt="" style={{ paddingLeft: "15px", paddingTop: "5px", height: "40px", width: "auto" }} /> */}
                        {/* </div> */}
                    </Col>
                    <Col span={18}>
                        <Row align={"top"} style={{ float: "right", paddingRight: "15px", paddingTop: "8px" }}>
                            {/* <Button type={"text"}></Button> */}
                            <Space direction="horizontal">

                                <div style={{ width: "30px", marginRight: "10px" }}>
                                    <LoadingSpinner />
                                </div>

                                <div>
                                    {t(APP_STAGE)}
                                </div>


                                {/* <Badge count={count} size={"small"} offset={[0, -3]}>
                                    <FontAwesomeIcon icon={faBell} key={"faArchive"} size={"2x"} onMouseOver={(e) => konsole.log("on Notification bell")} />
                                </Badge> */}

                                {/* <Button type={"text"}>usernme</Button> */}


                                <Menu className="!text-gray-300" title={"username"} mode="horizontal" style={{ background: "transparent", paddingRight: "0px" }}>
                                    <Menu.SubMenu title={activeUser || "unknown user"}>
                                        {/* <Menu.Item disabled ><Link to="/about"> {t("profile")}</Link></Menu.Item>
                                        <Menu.Item disabled><Link to="/settings"> {t("settings")}</Link></Menu.Item> */}
                                        <Menu.Item style={{ pointerEvents: 'none' }}>
                                            {t('acl_role')} :  {t(scopeToShow)}
                                        </Menu.Item>
                                        <Menu.Item onClick={handleSignout}>
                                            {t("log_out")}
                                        </Menu.Item>
                                    </Menu.SubMenu>
                                </Menu>


                                <Menu className="!text-gray-300" title={"username"} mode="horizontal" style={{ background: "transparent", paddingRight: "20px" }}>
                                    <Menu.SubMenu title={t(activeLanguage)}>
                                        {selectable_langauges.map((lang, index) => {
                                            if (activeLanguage !== lang) {
                                                return <Menu.Item onClick={() => setActiveLanguage(lang)}>{t(lang)}</Menu.Item>
                                            }
                                            
                                        })}
                                    </Menu.SubMenu>
                                </Menu>
                            </Space>


                        </Row>
                    </Col>


                </Row>

            </Header>

        </div>
    )
}





