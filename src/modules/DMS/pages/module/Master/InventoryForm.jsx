// forms/InventoryForm.jsx
import React from "react";
import { Row, Col, Form, Input, InputNumber, Select } from "antd";

const { Option } = Select;

export default function InventoryForm({ disabled = false }) {
  return (
    <>
      <h3 className="text-lg font-semibold text-amber-700 mb-2">
        Inventory Details
      </h3>

      <Row gutter={24}>
        <Col span={6}>
          <Form.Item
            label="Vendor Name"
            name="vendorName"
            rules={[{ required: true, message: "Please enter Vendor Name" }]}
          >
            <Input
              disabled={disabled}
              placeholder="Enter Vendor Name"
            />
          </Form.Item>
        </Col>

        <Col span={6}>
          <Form.Item
            label="Vendor ID"
            name="vendorId"
          >
            <Input
              disabled={disabled}
              placeholder="Enter Vendor ID"
            />
          </Form.Item>
        </Col>

        <Col span={6}>
          <Form.Item
            label="Product ID"
            name="productId"
            rules={[{ required: true, message: "Please enter Product ID" }]}
          >
            <Input
              disabled={disabled}
              placeholder="Enter Product ID"
            />
          </Form.Item>
        </Col>

        <Col span={6}>
          <Form.Item
            label="Product Name"
            name="productName"
            rules={[{ required: true, message: "Please enter Product Name" }]}
          >
            <Input
              disabled={disabled}
              placeholder="Enter Product Name"
            />
          </Form.Item>
        </Col>

        <Col span={6}>
          <Form.Item
            label="Product Group Name"
            name="productGroupName"
          >
            <Input
              disabled={disabled}
              placeholder="Enter Product Group Name"
            />
          </Form.Item>
        </Col>

        <Col span={6}>
          <Form.Item
            label="Product Type"
            name="productType"
          >
            <Select
              disabled={disabled}
              placeholder="Select Product Type"
            >
              <Option value="Raw Material">Raw Material</Option>
              <Option value="Finished Goods">Finished Goods</Option>
              <Option value="Packing Material">Packing Material</Option>
              <Option value="Consumable">Consumable</Option>
              <Option value="Other">Other</Option>
            </Select>
          </Form.Item>
        </Col>

        <Col span={6}>
          <Form.Item
            label="HSN Code"
            name="hsnCode"
          >
            <Input
              disabled={disabled}
              placeholder="Enter HSN Code"
            />
          </Form.Item>
        </Col>

        <Col span={6}>
          <Form.Item
            label="MRP"
            name="mrp"
          >
            <InputNumber
              disabled={disabled}
              style={{ width: "100%" }}
              min={0}
              placeholder="Enter MRP"
            />
          </Form.Item>
        </Col>

        <Col span={6}>
          <Form.Item
            label="Case Quantity"
            name="caseQuantity"
          >
            <InputNumber
              disabled={disabled}
              style={{ width: "100%" }}
              min={0}
              placeholder="Qty per case"
            />
          </Form.Item>
        </Col>

        <Col span={6}>
          <Form.Item
            label="Total Stock Available"
            name="totalStock"
          >
            <InputNumber
              disabled={disabled}
              style={{ width: "100%" }}
              min={0}
              placeholder="Total stock"
            />
          </Form.Item>
        </Col>

        <Col span={6}>
          <Form.Item
            label="Minimum Stock Balance"
            name="minStockBalance"
          >
            <InputNumber
              disabled={disabled}
              style={{ width: "100%" }}
              min={0}
              placeholder="Minimum stock"
            />
          </Form.Item>
        </Col>
      </Row>
    </>
  );
}
