import React from 'react';
import { LoadingOutlined } from '@ant-design/icons';
import { Spin } from 'antd';

const ButtonLoader = () => {

    const antIcon = (
        <LoadingOutlined
          style={{
            fontSize: 30, color: 'white', fontWeight: 'bold'
          }}
          spin
        />
      );
    return (
        <Spin indicator={antIcon} />
    );
};

export default ButtonLoader;