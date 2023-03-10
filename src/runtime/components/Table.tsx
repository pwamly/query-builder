import {
  Button,
  Checkbox,
  Dropdown,
  DropdownButton,
  DropdownItem,
  DropdownMenu,
  Input,
  MultiSelect,
  Option,
  Select,
  TextInput,
} from "jimu-ui";
import { SettingOutlined } from "jimu-icons/outlined/application/setting";
import { React } from "jimu-core";
import { CloseOutlined } from "jimu-icons/outlined/editor/close";
import {
  queryConstructorNumber,
  queryConstructorString,
} from "../utils/queryTableValue";
// import {useState} from 'react'

function Table(props) {
  const {
    list,
    handleThirdQuery,
    textInputHandler,
    multiSelectHandler,
    dropdownItemHandler,
    textFirstIncludedHandler,
    textSecondIncludedHandler,
    dropdownValueQuery,
    handleCheckBox,
    isChecked,
    counterIsChecked,
    dropDownToggler,
    functionCounterIsChecked,
    checkedToQuery,
    deleteTable,
    tablesId,
    getQueryAttribute,
    whereClauses,
    tables,
    getQuery,
    univocoSelectHandler,
    dropDown,
    isOpenDropD,
    onChangeCheckBox,
    openDrop,
    closeDrop,
    opened,
    autOpen,
    mouseleave,
    onmouseLeave,
  } = props;

  return (
    <div className="my-1">
      {list.fields ? (
        <div className="d-flex flex-column">
          <div className="row m-0">
            <div className="row w-100 d-flex justify-content-end">
              <Button
                className="mb-2 col-1 self-end"
                onClick={deleteTable}
                icon
              >
                <CloseOutlined />
              </Button>
            </div>
            <Select
              className="col-md-4 mb-2"
              onChange={getQueryAttribute}
              placeholder="Seleziona campo"
            >
              {/* eslint-disable-next-line array-callback-return */}
              {list.fields.map((el, i) => {
                if (
                  el.type === "oid" ||
                  el.type === "small-integer" ||
                  el.type === "integer" ||
                  el.type === "string" ||
                  el.type === "double"
                ) {
                  return (
                    <Option
                      data-table-id={tablesId}
                      value={i}
                      name={el.name}
                      dataType={el.type}
                    >
                      {el.alias} ({el.type})
                    </Option>
                  );
                }
              })}
            </Select>
            <div className="col-md-4 mb-2">
              <Select onChange={getQuery} placeholder="Seleziona campo">
                {whereClauses[tablesId] &&
                whereClauses[tablesId].attributeQueryType === "string"
                  ? queryConstructorString.map((o, i) => {
                      return (
                        <Option
                          data-table-id={tablesId}
                          value={i}
                          name={o.value}
                        >
                          {o.name}
                        </Option>
                      );
                    })
                  : queryConstructorNumber.map((o, i) => {
                      return (
                        <Option
                          data-table-id={tablesId}
                          value={i}
                          name={o.value}
                        >
                          {o.name}
                        </Option>
                      );
                    })}
              </Select>
            </div>
            <SecondConstructor
              className="col-md-4"
              handleThirdQuery={handleThirdQuery}
              textInputHandler={textInputHandler}
              multiSelectHandler={multiSelectHandler}
              dropdownItemHandler={dropdownItemHandler}
              textFirstIncludedHandler={textFirstIncludedHandler}
              textSecondIncludedHandler={textSecondIncludedHandler}
              dropdownValueQuery={dropdownValueQuery}
              handleCheckBox={handleCheckBox}
              isChecked={isChecked}
              counterIsChecked={counterIsChecked}
              functionCounterIsChecked={functionCounterIsChecked}
              checkedToQuery={checkedToQuery}
              getQueryAttribute={getQueryAttribute}
              whereClauses={whereClauses}
              tablesId={tablesId}
              dropDownToggler={dropDownToggler}
              univocoSelectHandler={univocoSelectHandler}
              dropDown={dropDown}
              isOpenDropD={isOpenDropD}
              onChangeCheckBox={onChangeCheckBox}
              openDrop={openDrop}
              closeDrop={closeDrop}
              opened={opened}
              autOpen={autOpen}
              mouseleave={mouseleave}
              onmouseLeave={onmouseLeave}
            />
          </div>
        </div>
      ) : (
        ""
      )}
    </div>
  );
}
const Switch = (props) => {
  const { queryValues, children } = props;
  // filter out only children with a matching prop
  return children.find((child) => {
    return child.props.value === queryValues;
  });
};

const SecondConstructor = (props) => {
  const {
    textInputHandler,
    dropdownItemHandler,
    textFirstIncludedHandler,
    textSecondIncludedHandler,
    counterIsChecked,
    functionCounterIsChecked,
    tablesId,
    whereClauses,
    dropDownToggler,
    univocoSelectHandler,
    dropDown,
    isOpenDropD,
    onChangeCheckBox,
    openDrop,
    closeDrop,
    opened: d,
    autOpen,
    onmouseLeave,
  } = props;
  const normalizedThirdQuery = [];
  let defaultValue = "=";
  let dropdownValueQuery = "valore";
  let opened = false;
  let checked = 0;
  let au = true;

  // valueThirdQuery.map((el, i) => { normalizedThirdQuery.push({ label: el.label[0].toString(), value: el.value[0].toString() }) })
  if (whereClauses[tablesId] && whereClauses[tablesId].ifInOrNotInQueryValue) {
    whereClauses[tablesId].ifInOrNotInQueryValue.map((el, i) => {
      normalizedThirdQuery.push({
        id: tablesId.toString(),
        label: el.label[0].toString(),
        value: el.value[0].toString(),
        listel: whereClauses[tablesId].checkedList,
      });
    });
  }
  if (whereClauses[tablesId] && whereClauses[tablesId].queryValue) {
    defaultValue = whereClauses[tablesId].queryValue;
  }
  if (whereClauses[tablesId] && whereClauses[tablesId].dropdownValueQuery) {
    dropdownValueQuery = whereClauses[tablesId].dropdownValueQuery;
  }
  if (whereClauses[tablesId] && whereClauses[tablesId].isOpen) {
    // opened = whereClauses[tablesId].isOpen;
  }

  if (whereClauses[tablesId] && whereClauses[tablesId].checkedList) {
    checked = whereClauses[tablesId].checkedList.length;
  }

  const test = (props) => {};
  return (
    <Switch queryValues={defaultValue}>
      <div value={"="} className="d-flex col-md-4">
        {dropdownValueQuery === "univoco" ? (
          <Select
            onChange={univocoSelectHandler}
            placeholder="Seleziona il Layer"
          >
            {normalizedThirdQuery.map((el, i) => {
              return (
                <Option value={i} data-table-id={tablesId}>
                  {el.label}
                </Option>
              );
            })}
          </Select>
        ) : (
          <TextInput
            onChange={textInputHandler}
            onAcceptValue={function noRefCheck() {}}
            type="text"
            className=" w-100"
            data-table-id={tablesId}
          />
        )}
        <div className="flex-shrink-1">
          {}
          <Dropdown activeIcon>
            <DropdownButton>
              <SettingOutlined className="setting-svg" />
            </DropdownButton>
            <DropdownMenu>
              <DropdownItem header>Importa il tipo di input</DropdownItem>
              <DropdownItem divider />
              <DropdownItem
                value="valore"
                onClick={dropdownItemHandler}
                data-table-id={tablesId}
              >
                Valore
              </DropdownItem>
              <DropdownItem
                value="campo"
                onClick={dropdownItemHandler}
                disabled
                data-table-id={tablesId}
              >
                Campo
              </DropdownItem>
              <DropdownItem
                value="univoco"
                onClick={dropdownItemHandler}
                data-table-id={tablesId}
              >
                Univoci
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </div>
      </div>
      <div value={"<>"} className="d-flex col-md-4">
        {dropdownValueQuery === "univoco" ? (
          <Select
            onChange={univocoSelectHandler}
            placeholder="Seleziona il Layer"
          >
            {normalizedThirdQuery.map((el, i) => {
              return (
                <Option value={i} data-table-id={tablesId}>
                  {el.label}
                </Option>
              );
            })}
          </Select>
        ) : (
          <TextInput
            onChange={textInputHandler}
            onAcceptValue={function noRefCheck() {}}
            type="text"
            className=" w-100"
            data-table-id={tablesId}
          />
        )}
        <div className="flex-shrink-1">
          <Dropdown activeIcon>
            <DropdownButton>
              <SettingOutlined className="setting-svg" />
            </DropdownButton>
            <DropdownMenu>
              <DropdownItem header>Importa il tipo di input</DropdownItem>
              <DropdownItem divider />
              <DropdownItem
                value="valore"
                onClick={dropdownItemHandler}
                data-table-id={tablesId}
              >
                Valore
              </DropdownItem>
              <DropdownItem
                value="campo"
                onClick={dropdownItemHandler}
                disabled
                data-table-id={tablesId}
              >
                Campo
              </DropdownItem>
              <DropdownItem
                value="univoco"
                onClick={dropdownItemHandler}
                data-table-id={tablesId}
              >
                Univoci
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </div>
      </div>
      <div value={"IN"} onMouseLeave={() => onmouseLeave()}>
        <div className="w-100">
          {
            <Dropdown activeIcon isOpen={autOpen} toggle={() => dropDown}>
              <DropdownButton onClick={() => openDrop()}>
                {checked} elementi selezionati
              </DropdownButton>
              <DropdownMenu>
                <DropdownItem header>Multi selezione attiva</DropdownItem>
                <DropdownItem divider />
                {normalizedThirdQuery.map((el, i) => {
                  return (
                    <div>
                      <DropdownItem
                        value={i}
                        data-table-id={tablesId}
                        className="d-flex justify-content-start"
                        strategy={"fixed"}
                      >
                        {
                          <Input
                            onChange={onChangeCheckBox}
                            type="checkbox"
                            id={tablesId}
                            name={el.label}
                            value={el.label}
                            defaultChecked={
                              el.listel &&
                              el.listel.filter(function (e) {
                                return e.checkValue === el.label;
                              }).length > 0
                            }
                          />
                        }
                        <label
                          htmlFor={tablesId}
                          className="ml-3 mb-0"
                          id={tablesId}
                        >
                          {" "}
                          {el.label}
                        </label>
                      </DropdownItem>
                    </div>
                  );
                })}
              </DropdownMenu>
            </Dropdown>
          }
          {/*<MultiSelect*/}
          {/*    displayByValues={function myFunction (e) { return `${counterIsChecked.length} elementi selezionati` }}*/}
          {/*    items={normalizedThirdQuery}*/}
          {/*    onClickItem={functionCounterIsChecked}*/}
          {/*    placeholder={'0 elementi selezionati'}*/}
          {/*    data-table-id={tablesId}*/}
          {/*    onClick={test}*/}
          {/*/>*/}
        </div>
      </div>
      <div value={"NOT_IN"} className="d-flex justify-content-between">
        <div className="w-100">
          <MultiSelect
            displayByValues={function myFunction(e) {
              return `${counterIsChecked.length} elementi selezionati`;
            }}
            items={normalizedThirdQuery}
            onClickItem={functionCounterIsChecked}
            onClick={test}
            placeholder={"0 elementi selezionati"}
            id={tablesId}
          />
        </div>
      </div>
      <div value={"<="} className="d-flex  col-md-4">
        {dropdownValueQuery === "univoco" ? (
          <Select placeholder="Seleziona il Layer">
            {normalizedThirdQuery.map((el, i) => {
              return (
                <Option value={i} data-table-id={tablesId}>
                  {el.label}
                </Option>
              );
            })}
          </Select>
        ) : (
          <TextInput
            onChange={textInputHandler}
            onAcceptValue={function noRefCheck() {}}
            type="text"
            className=" w-100"
            data-table-id={tablesId}
          />
        )}
        <div className="flex-shrink-1">
          <Dropdown activeIcon>
            <DropdownButton>
              <SettingOutlined className="setting-svg" />
            </DropdownButton>
            <DropdownMenu>
              <DropdownItem header>Importa il tipo di input</DropdownItem>
              <DropdownItem divider />
              <DropdownItem
                value="valore"
                onClick={dropdownItemHandler}
                data-table-id={tablesId}
              >
                Valore
              </DropdownItem>
              <DropdownItem
                value="campo"
                onClick={dropdownItemHandler}
                disabled
                data-table-id={tablesId}
              >
                Campo
              </DropdownItem>
              <DropdownItem
                value="univoco"
                onClick={dropdownItemHandler}
                data-table-id={tablesId}
              >
                Univoci
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </div>
      </div>
      <div value={">="} className="d-flex col-md-4">
        {dropdownValueQuery === "univoco" ? (
          <Select placeholder="Seleziona il Layer">
            {normalizedThirdQuery.map((el, i) => {
              return (
                <Option value={i} data-table-id={tablesId}>
                  {el.label}
                </Option>
              );
            })}
          </Select>
        ) : (
          <TextInput
            onChange={textInputHandler}
            onAcceptValue={function noRefCheck() {}}
            type="text"
            className=" w-100"
            data-table-id={tablesId}
          />
        )}
        <div className="flex-shrink-1">
          <Dropdown activeIcon>
            <DropdownButton>
              <SettingOutlined className="setting-svg" />
            </DropdownButton>
            <DropdownMenu>
              <DropdownItem header>Importa il tipo di input</DropdownItem>
              <DropdownItem divider />
              <DropdownItem
                value="valore"
                onClick={dropdownItemHandler}
                data-table-id={tablesId}
              >
                Valore
              </DropdownItem>
              <DropdownItem
                value="campo"
                onClick={dropdownItemHandler}
                disabled
                data-table-id={tablesId}
              >
                Campo
              </DropdownItem>
              <DropdownItem
                value="univoco"
                onClick={dropdownItemHandler}
                data-table-id={tablesId}
              >
                Univoci
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </div>
      </div>
      <div value={"<"} className="d-flex col-md-4">
        {dropdownValueQuery === "univoco" ? (
          <Select placeholder="Seleziona il Layer">
            {normalizedThirdQuery.map((el, i) => {
              return (
                <Option value={i} data-table-id={tablesId}>
                  {el.label}
                </Option>
              );
            })}
          </Select>
        ) : (
          <TextInput
            onChange={textInputHandler}
            onAcceptValue={function noRefCheck() {}}
            type="text"
            className=" w-100"
            data-table-id={tablesId}
          />
        )}
        <div className="flex-shrink-1">
          <Dropdown activeIcon>
            <DropdownButton>
              <SettingOutlined className="setting-svg" />
            </DropdownButton>
            <DropdownMenu>
              <DropdownItem header>Importa il tipo di input</DropdownItem>
              <DropdownItem divider />
              <DropdownItem
                value="valore"
                onClick={dropdownItemHandler}
                data-table-id={tablesId}
              >
                Valore
              </DropdownItem>
              <DropdownItem
                value="campo"
                onClick={dropdownItemHandler}
                disabled
                data-table-id={tablesId}
              >
                Campo
              </DropdownItem>
              <DropdownItem
                value="univoco"
                onClick={dropdownItemHandler}
                data-table-id={tablesId}
              >
                Univoci
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </div>
      </div>
      <div value={">"} className="d-flex col-md-4">
        {dropdownValueQuery === "univoco" ? (
          <Select placeholder="Seleziona il Layer">
            {normalizedThirdQuery.map((el, i) => {
              return (
                <Option value={i} data-table-id={tablesId}>
                  {el.label}
                </Option>
              );
            })}
          </Select>
        ) : (
          <TextInput
            onChange={textInputHandler}
            onAcceptValue={function noRefCheck() {}}
            type="text"
            className=" w-100"
            data-table-id={tablesId}
          />
        )}
        <div className="flex-shrink-1">
          <Dropdown activeIcon>
            <DropdownButton>
              <SettingOutlined className="setting-svg" />
            </DropdownButton>
            <DropdownMenu>
              <DropdownItem header>Importa il tipo di input</DropdownItem>
              <DropdownItem divider />
              <DropdownItem
                value="valore"
                onClick={dropdownItemHandler}
                data-table-id={tablesId}
              >
                Valore
              </DropdownItem>
              <DropdownItem
                value="campo"
                onClick={dropdownItemHandler}
                disabled
                data-table-id={tablesId}
              >
                Campo
              </DropdownItem>
              <DropdownItem
                value="univoco"
                onClick={dropdownItemHandler}
                data-table-id={tablesId}
              >
                Univoci
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </div>
      </div>
      <div value={"is null"}></div>
      <div value={"is not null"}></div>
      <div value={"included"} className="d-flex col-md-4">
        <div className="row d-flex justify-content-between">
          <TextInput
            onChange={textFirstIncludedHandler}
            onAcceptValue={function noRefCheck() {}}
            type="text"
            className="w-100"
            data-table-id={tablesId}
          />
          <p className="col-md-2 text-center">e</p>
          <TextInput
            onChange={textSecondIncludedHandler}
            onAcceptValue={function noRefCheck() {}}
            type="text"
            className="w-100"
            data-table-id={tablesId}
          />
        </div>
      </div>
      <div value={"is_not_included"} className="d-flex col-md-4">
        <div className="row d-flex justify-content-between">
          <TextInput
            onChange={textFirstIncludedHandler}
            onAcceptValue={function noRefCheck() {}}
            type="text"
            className="w-100"
            data-table-id={tablesId}
          />
          <p className="col-md-2 text-center">e</p>
          <TextInput
            onChange={textSecondIncludedHandler}
            onAcceptValue={function noRefCheck() {}}
            type="text"
            className="w-100"
            data-table-id={tablesId}
          />
        </div>
      </div>
      <div value={"LIKE%"} className="d-flex col-md-4">
        <TextInput
          onChange={textInputHandler}
          onAcceptValue={function noRefCheck() {}}
          type="text"
          className=" w-100"
          data-table-id={tablesId}
        />
      </div>
      <div value={"%LIKE"} className="d-flex col-md-4">
        <TextInput
          onChange={textInputHandler}
          onAcceptValue={function noRefCheck() {}}
          type="text"
          className=" w-100"
          data-table-id={tablesId}
        />
      </div>
      <div value={"LIKE%"} className="d-flex col-md-4">
        <TextInput
          onChange={textInputHandler}
          onAcceptValue={function noRefCheck() {}}
          type="text"
          className=" w-100"
          data-table-id={tablesId}
        />
      </div>
      <div value={"%LIKE%"} className="d-flex col-md-4">
        <TextInput
          onChange={textInputHandler}
          onAcceptValue={function noRefCheck() {}}
          type="text"
          className=" w-100"
          data-table-id={tablesId}
        />
      </div>
      <div value={"NOT LIKE"} className="d-flex col-md-4">
        <TextInput
          onChange={textInputHandler}
          onAcceptValue={function noRefCheck() {}}
          type="text"
          className=" w-100"
          data-table-id={tablesId}
        />
      </div>
    </Switch>
  );
};

export default Table;
