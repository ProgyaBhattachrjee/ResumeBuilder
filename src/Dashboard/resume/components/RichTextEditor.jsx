import React, { useState } from 'react'
import { BtnBold, BtnBulletList, BtnItalic, BtnLink, BtnNumberedList, BtnStrikeThrough, BtnUnderline, Editor, EditorProvider, HtmlButton, Separator, Toolbar } from 'react-simple-wysiwyg';


const RichTextEditor = ({onRichTextChange}) => {
    const [val,setval] = useState('');
  return (
    <div>
    <div className='flex justify-between my-2'>
      <label className='text-xs'>Summery</label>
    </div>
  <EditorProvider>
    <Editor  value={val} onChange={(e)=> {
    setval(e.target.value);
    onRichTextChange(e);
    }}>
      <Toolbar>
        <BtnBold/>
        <Separator/>
        <BtnItalic/>
        <Separator/>
         <BtnUnderline/>
         <Separator/>
         <BtnStrikeThrough/>
         <Separator/>
         <BtnBulletList/>
         <Separator/>
         <BtnNumberedList/>
         <Separator/>
         <BtnLink/>
      </Toolbar>
    </Editor>
    </EditorProvider>
  </div>
  )
}

export default RichTextEditor
