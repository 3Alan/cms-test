import React, { useEffect } from 'react';
import CMS from 'netlify-cms-app';
import MDXContent from '@theme/MDXContent';
import './index.css';

const BlogPostPreview = (props) => {
  console.log(props.entry.getIn(['data']).toObject() );
  const content = props.entry.getIn(['data', 'body']);

  return <MDXContent>{content}</MDXContent>
}

const AdminPage: React.FC = (props) => {
  console.log(props,' 7777');
  
  useEffect(() => {
    CMS.init();

    CMS.registerPreviewTemplate('blog', BlogPostPreview)
  }, []);

  return null;
};

export default AdminPage;
