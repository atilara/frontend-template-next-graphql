import { FormEvent, useCallback, useState } from 'react';
import { useAuth } from '@/hooks/auth';
import { Button, Checkbox, Form, Input, Row } from 'antd';

export default function Signin() {
  const [form] = Form.useForm();
  const [loadings, setLoadings] = useState<boolean[]>([]);

  const { signIn } = useAuth();

  const onFinishhandleSubmit = useCallback(
    async (values: any) => {
      setLoadings([ true ]);
      
      console.log(values);
      console.log(loadings);

      setTimeout(async () => {
        await signIn(values);
        
        setLoadings([ false ]);
      }, 3000);
      
    },
    [signIn]
  );

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
    setLoadings((prevLoadings) => {
      const newLoadings = [...prevLoadings];
      newLoadings[0] = false;
      return newLoadings;
    });
  };

  return (
    <Row
      justify="center"
      align="middle"
      style={{ minHeight: '100vh' }}
    >
      <Form
        name="basic"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        initialValues={{ remember: true }}
        onFinish={onFinishhandleSubmit}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
        form={form}
      >
        <Form.Item
          label="Email"
          name="email"
          rules={[{ required: true, message: 'Please input your email!' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Password"
          name="password"
          rules={[{ required: true, message: 'Please input your password!' }]}
        >
          <Input.Password />
        </Form.Item>
        <Form.Item style={{ float: 'right' }}>
          <Button loading={loadings[0]} type="primary" htmlType="submit" >
            Submit
          </Button>
        </Form.Item>
      </Form>
    </Row>
  );
}
