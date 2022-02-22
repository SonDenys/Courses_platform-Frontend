import React, { useEffect, useState } from "react";
import { Layout, Select, Space } from "antd";
import { constSelector, useRecoilState, useRecoilValue } from "recoil";
// import { selectedCompanyState, companyDataState, scopesState } from "../../_GlobalStates";
import { useTranslation } from "react-i18next";
import { is_company_selectable } from "../../_GlobalStates/rbac";
import { getPayloadValue, getScopes } from "../../Auth";
import konsole from "../../konsole";
import { get_organizations } from "../../pages/AdminDashboard/helpers/apicalls";
import { selectedOrganization_State } from "../../_GlobalStates/globalState/index";

const { Option } = Select;

export interface CompanySelectProps {
  onChange?: Function;
  readOnly?: true | false;
  organizations_data?: any;
}

let lastUpdated: number = 0;
let autoReloadWaitTime = 5 * 60 * 1000;

export default function CompanySelect(props: CompanySelectProps) {
  const { t } = useTranslation();
  const [organizations, setOrganizations] = useState([]);
  const [selectedOrganization, setSelectedOrganization] = useRecoilState(
    selectedOrganization_State
  );

  const [isSelectable, setSelectable] = useState(true);
  // const scopes = useRecoilValue(scopesState)
  const scopes = getScopes();

  const company_id = getPayloadValue("company_id");

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const response = await get_organizations();
        setOrganizations(response.data);
        console.log("get organizations_____data response = = =", response.data);
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  // (async () => {
  //     await getCompanyData()
  // }

  // )()

  // if (selectedOrganization._id !== company_id) {
  //     (async () =>
  //         await getCompanyData(company_id)
  //     )()
  //     konsole.log(`hell`)
  // }
  // }
  // }, [])

  // useEffect(() => {
  //     if (!is_company_selectable(scopes)) {
  //         setSelectable(false);
  //     }

  //     // (async () => {
  //     //     await getCompanyData()
  //     // }

  //     // )()

  //     // if (selectedOrganization._id !== company_id) {
  //     //     (async () =>
  //     //         await getCompanyData(company_id)
  //     //     )()
  //     //     konsole.log(`hell`)
  //     // }
  //     // }
  // }, [])

  const getCompanyData = async () => {
    try {
      const response = await get_organizations();
      //   const response: any = {};
      if (response && response.success) {
        setSelectedOrganization(response.data[0]);
        console.log("get organization response = = =", response.data[0]);
        //alert(JSON.stringify(response.data))
        setLoading(true);
      } else {
      }
    } catch (e) {
      konsole.log(e);
    }
  };

  const on_change = (value) => {
    if (value) {
      const new_value = JSON.parse(value);
      setSelectedOrganization(new_value);
      console.log("selected organization response ====>", new_value);

      if (props.onChange) {
        props.onChange(new_value);
      }
    }
  };

  const on_focus = async () => {
    konsole.log("on_focus called");
    if (!organizations || (organizations && organizations.length === 0)) {
      if (Date.now() - lastUpdated < autoReloadWaitTime) {
        return;
      }

      try {
        const result: any = {}; //await get_companies({})
        if (result && result.data) {
          setOrganizations(result.data);
          lastUpdated = Date.now();
        }
      } catch (e) {
        konsole.log(e);
      }
    }
  };

  const on_search = (value) => {};

  return (
    <>
      {loading && (
        <Space style={{ paddingRight: "10px" }} className="cursor-pointer">
          <span>
            {!props.readOnly && t("organizations")}{" "}
            {props.readOnly && (selectedOrganization as any).name}
          </span>
          {/* {
                    !isSelectable &&
                    <span>
                        {`: ${selectedOrganization.name} `}
                    </span>
                } */}
          {!props.readOnly && (
            <Select
              className="cursor-pointer"
              showSearch
              style={{ width: 200 }}
              // placeholder={t("select_a_company")}
              placeholder="select your organization"
              optionFilterProp="children"
              //defaultValue={(selectedOrganization as any).name as any}
              defaultValue={(selectedOrganization as any).name as any}
              value={(selectedOrganization as any).name as any}
              onChange={on_change}
              onFocus={on_focus}
              disabled={!isSelectable}
              // onBlur={onBlur}
              onSearch={on_search}
              filterOption={(input: any, option: any) =>
                option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
              }
            >
              {((organizations || []) as any).map((x, index) => {
                return (
                  <Option key={index} value={JSON.stringify(x)}>
                    {x.name}
                  </Option>
                );
              })}
            </Select>
          )}
        </Space>
      )}
    </>
  );
}
