import dynamic from 'next/dynamic';
import styled from '@emotion/styled';
import Button from './Button';

const Editor = dynamic(
  () => import('react-draft-wysiwyg').then((module) => module.Editor),
  { ssr: false },
);

export default function CustomEditor({
  editorState,
  readOnly = false,
  onEditorStateChange,
  onSave,
}) {
  return (
    <Wrapper>
      <Editor
        readOnly={readOnly}
        editorState={editorState}
        toolbarHidden={readOnly}
        toolbarClassName="wrapper-class"
        wrapperClassName="editorToolbar-hidden"
        editorClassName="editor-class"
        toolbar={{
          options: ['inline', 'list', 'textAlign', 'link'],
        }}
        localization={{ locale: 'ko' }}
        onEditorStateChange={onEditorStateChange}
      />
      {!readOnly && <Button onClick={onSave}>Save</Button>}
    </Wrapper>
  );
}

const Wrapper = styled.div`
  padding: 16px;
`;
