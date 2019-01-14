import React, { Component } from 'react'
import { Card, Button, Modal } from 'antd'
import { Editor } from 'react-draft-wysiwyg'
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css'
import draftToHtml from 'draftjs-to-html'

class RichText extends Component {
  state = {
    showRichText: false,
    contentState: {}
  }

  onEditorStateChange = (editorState) => {
    this.setState({
      editorState
    })
  }

  onContentStateChange = (contentState) => {
    this.setState({
      contentState
    })
  }

  handleClearContext = () => {
    this.setState({
      editorState: ''
    })
  }

  handleGetText = () => {
    this.setState({
      showRichText: true
    })
  }

  render() {
    const { editorState } = this.state
    return (
      <div>
        <Card>
          <Button type='primary' onClick={this.handleClearContext}>清空内容</Button>
          <Button type='primary' onClick={this.handleGetText} style={{marginLeft: 10}}>获取html文本</Button>
        </Card>
        <Card title='富文本编辑器'>
          <Editor
            editorState={editorState}
            onContentStateChange={this.onContentStateChange}
            onEditorStateChange={this.onEditorStateChange}
          />
        </Card>
        <Modal 
          title='富文本'
          visible={this.state.showRichText}
          onCancel={() => {
            this.setState({
              showRichText: false
            })
          }}
          footer={null}
        >
          {draftToHtml(this.state.contentState)}
        </Modal>
      </div>
    )
  }
}

export default RichText