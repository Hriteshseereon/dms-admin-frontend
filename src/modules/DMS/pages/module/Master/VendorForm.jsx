// forms/VendorForm.jsx
import React from "react";
import { Row, Col, Form, Input, Select, DatePicker, Button, Card } from "antd";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";

const { Option } = Select;

export default function VendorForm({ disabled = false }) {
  return (
    <>
      <h3 className="text-lg font-semibold text-amber-700 mb-2">
        Vendor Details
      </h3>

      <Row gutter={24}>
        <Col span={4}>
          <Form.Item
            label="Short Name"
            name="shortName"
            rules={[{ required: true, message: "Please enter short name" }]}
          >
            <Input disabled={disabled} className="border-amber-400" />
          </Form.Item>
        </Col>

        <Col span={4}>
          <Form.Item
            label="Company Name"
            name="name"
            rules={[{ required: true, message: "Please enter company name" }]}
          >
            <Input disabled={disabled} className="border-amber-400" />
          </Form.Item>
        </Col>

        <Col span={4}>
          <Form.Item label="Address" name="address">
            <Input disabled={disabled} className="border-amber-400" />
          </Form.Item>
        </Col>

        <Col span={4}>
          <Form.Item label="Phone No" name="phoneNo">
            <Input disabled={disabled} className="border-amber-400" />
          </Form.Item>
        </Col>

        <Col span={4}>
          <Form.Item label="Fax No" name="faxNo">
            <Input disabled={disabled} className="border-amber-400" />
          </Form.Item>
        </Col>

        <Col span={4}>
          <Form.Item label="Tin No" name="tinNo">
            <Input disabled={disabled} className="border-amber-400" />
          </Form.Item>
        </Col>

        <Col span={4}>
          <Form.Item label="Tin Date" name="tinDate">
            <DatePicker
              className="w-full"
              disabled={disabled}
              format="DD:MM:YYYY"
            />
          </Form.Item>
        </Col>

        <Col span={4}>
          <Form.Item label="PAN No" name="panNo">
            <Input disabled={disabled} className="border-amber-400" />
          </Form.Item>
        </Col>

        <Col span={4}>
          <Form.Item label="GSTIN" name="gstIn">
            <Input disabled={disabled} className="border-amber-400" />
          </Form.Item>
        </Col>

        <Col span={4}>
          <Form.Item label="ET No" name="etno">
            <Input disabled={disabled} className="border-amber-400" />
          </Form.Item>
        </Col>

        <Col span={4}>
          <Form.Item label="ET Date" name="etDate">
            <DatePicker
              className="w-full"
              disabled={disabled}
              format="DD:MM:YYYY"
            />
          </Form.Item>
        </Col>

        <Col span={4}>
          <Form.Item label="CST No" name="cstNo">
            <Input disabled={disabled} className="border-amber-400" />
          </Form.Item>
        </Col>

        <Col span={4}>
          <Form.Item label="CST Date" name="cstDate">
            <DatePicker
              className="w-full"
              disabled={disabled}
              format="DD:MM:YYYY"
            />
          </Form.Item>
        </Col>

        <Col span={4}>
          <Form.Item label="Trade No" name="tradeNo">
            <Input disabled={disabled} className="border-amber-400" />
          </Form.Item>
        </Col>

        <Col span={4}>
          <Form.Item label="Website / URL (if any)" name="websiteUrl">
            <Input disabled={disabled} className="border-amber-400" />
          </Form.Item>
        </Col>

        <Col span={4}>
          <Form.Item label="Email" name="email">
            <Input disabled={disabled} className="border-amber-400" />
          </Form.Item>
        </Col>

        <Col span={4}>
          <Form.Item label="Transaction Type" name="transactionType">
            <Select disabled={disabled} className="border-amber-400">
              <Option value="Super Stockist">Super Stockist</Option>
              <Option value="Distributor">Distributor</Option>
              <Option value="Retailer">Retailer</Option>
            </Select>
          </Form.Item>
        </Col>

        <Col span={4}>
          <Form.Item label="Transaction Status" name="tranStatus">
            <Select disabled={disabled} className="border-amber-400">
              <Option value="Inside">Inside</Option>
              <Option value="Outside">Outside</Option>
            </Select>
          </Form.Item>
        </Col>

        <Col span={4}>
          <Form.Item label="IGST Applicable" name="igstApplicable">
            <Select disabled={disabled} className="border-amber-400">
              <Option value="Yes">Yes</Option>
              <Option value="No">No</Option>
            </Select>
          </Form.Item>
        </Col>

        <Col span={4}>
          <Form.Item label="State" name="state">
            <Input disabled={disabled} placeholder="Enter State" />
          </Form.Item>
        </Col>

        <Col span={4}>
          <Form.Item label="District" name="district">
            <Input disabled={disabled} placeholder="Enter District" />
          </Form.Item>
        </Col>

        <Col span={4}>
          <Form.Item label="City" name="city">
            <Input disabled={disabled} placeholder="Enter City" />
          </Form.Item>
        </Col>

        <Col span={4}>
          <Form.Item label="Pin Code" name="pinCode">
            <Input disabled={disabled} placeholder="Enter Pin Code" />
          </Form.Item>
        </Col>

        <Col span={4}>
          <Form.Item label="Location" name="location">
            <Input disabled={disabled} className="border-amber-400" />
          </Form.Item>
        </Col>

        <Col span={4}>
          <Form.Item label="Status" name="status">
            <Select disabled={disabled} className="border-amber-400">
              <Option value="Active">Active</Option>
              <Option value="Inactive">Inactive</Option>
            </Select>
          </Form.Item>
        </Col>
      </Row>

      {/* ===== Plant Details (Dynamic List) ===== */}
      <h3 className="text-lg font-semibold text-amber-700 mt-4 mb-2">
        Plant Details
      </h3>
      <div className="max-h-60 overflow-y-auto pr-4">
        <Form.List name="plants">
          {(fields, { add, remove }) => (
            <>
              {fields.map(({ key, name, fieldKey, ...restField }, index) => (
                <Card
                  key={key}
                  title={
                    <span className="text-amber-700">Plant {index + 1}</span>
                  }
                  extra={
                    !disabled && (
                      <MinusCircleOutlined
                        onClick={() => remove(name)}
                        className="text-red-500 hover:text-red-700"
                      />
                    )
                  }
                  style={{ marginBottom: 16, border: "1px solid #ffc877" }}
                >
                  <Row gutter={24}>
                    <Col span={4}>
                      <Form.Item
                        {...restField}
                        name={[name, "plantName"]}
                        fieldKey={[fieldKey, "plantName"]}
                        label="Plant Name"
                        rules={[
                          { required: true, message: "Missing Plant Name" },
                        ]}
                      >
                        <Input
                          disabled={disabled}
                          placeholder="Enter Plant Name"
                        />
                      </Form.Item>
                    </Col>

                    <Col span={4}>
                      <Form.Item
                        {...restField}
                        name={[name, "address"]}
                        fieldKey={[fieldKey, "address"]}
                        label="Address"
                      >
                        <Input
                          disabled={disabled}
                          placeholder="Enter Plant Address"
                        />
                      </Form.Item>
                    </Col>

                    <Col span={4}>
                      <Form.Item
                        {...restField}
                        name={[name, "phoneNo"]}
                        fieldKey={[fieldKey, "phoneNo"]}
                        label="Phone No"
                      >
                        <Input
                          disabled={disabled}
                          placeholder="Enter Phone Number"
                        />
                      </Form.Item>
                    </Col>

                    <Col span={4}>
                      <Form.Item
                        {...restField}
                        name={[name, "email"]}
                        fieldKey={[fieldKey, "email"]}
                        label="Email"
                      >
                        <Input
                          disabled={disabled}
                          placeholder="Enter Email"
                        />
                      </Form.Item>
                    </Col>

                    <Col span={4}>
                      <Form.Item
                        {...restField}
                        name={[name, "state"]}
                        fieldKey={[fieldKey, "state"]}
                        label="State"
                      >
                        <Input
                          disabled={disabled}
                          placeholder="Enter State"
                        />
                      </Form.Item>
                    </Col>

                    <Col span={4}>
                      <Form.Item
                        {...restField}
                        name={[name, "district"]}
                        fieldKey={[fieldKey, "district"]}
                        label="District"
                      >
                        <Input
                          disabled={disabled}
                          placeholder="Enter District"
                        />
                      </Form.Item>
                    </Col>

                    <Col span={4}>
                      <Form.Item
                        {...restField}
                        name={[name, "city"]}
                        fieldKey={[fieldKey, "city"]}
                        label="City"
                      >
                        <Input
                          disabled={disabled}
                          placeholder="Enter City"
                        />
                      </Form.Item>
                    </Col>

                    <Col span={4}>
                      <Form.Item
                        {...restField}
                        name={[name, "pin"]}
                        fieldKey={[fieldKey, "pin"]}
                        label="Pin"
                      >
                        <Input
                          disabled={disabled}
                          placeholder="Enter Pin"
                        />
                      </Form.Item>
                    </Col>

                    <Col span={4}>
                      <Form.Item
                        {...restField}
                        name={[name, "faxNo"]}
                        fieldKey={[fieldKey, "faxNo"]}
                        label="Fax No"
                      >
                        <Input
                          disabled={disabled}
                          placeholder="Enter Fax No"
                        />
                      </Form.Item>
                    </Col>
                  </Row>
                </Card>
              ))}

              {!disabled && (
                <Form.Item>
                  <Button
                    type="dashed"
                    onClick={() => add()}
                    block
                    icon={<PlusOutlined />}
                    className="border-amber-400 text-amber-700 hover:bg-amber-100"
                  >
                    Add Plant
                  </Button>
                </Form.Item>
              )}
            </>
          )}
        </Form.List>
      </div>
    </>
  );
}
