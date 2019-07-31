import React,{Component} from 'react';
import './App.css';
import marked from 'marked';

class MarkDownPreviewer extends Component{
      constructor(props){
        super(props)
        this.state={
          expanded: false,
          visibleEditor:true,
          VisiblePreview:true,
          input:"Heading\n=======\r\n\r\n> block quote\r\n\r\n```\nfunction createMarkup() {\n  return {__html: 'First &middot; Second'};\n}\n\nfunction MyComponent() {\n  return <div dangerouslySetInnerHTML={createMarkup()} />;\n}\n```\n\r\n\r\n ![React Logo w/ Text](https://goo.gl/Umyytc)\r\n\r\nSub-heading\r\n-----------\r\n\r\n### Another deeper heading\r\n\r\nParagraphs are separated\r\nby a blank line.\r\n\r\nLeave 2 spaces at the end of a line to do a\r\nline break\r\n\r\nText attributes *italic*, **bold**,\r\n`monospace`, ~~strikethrough~~ .\r\n\r\nShopping list:\r\n\r\n  * apples\r\n  * oranges\r\n  * pears\r\n\r\nNumbered list:\r\n\r\n  1. apples\r\n  2. oranges\r\n  3. pears\r\n\r\nThe rain---not the reign---in\r\nSpain.\r\n\r\n *[Herman Fassett](https:\/\/freecodecamp.com\/hermanfassett)*`<div></div>`\r\n\r\n\# header\r\n\r\n```\nfunction anotherExample(firstLine, lastLine){\r if (firstLine == && lastLine ==){\r return multiLineCode;}\n}\n```"
        };
        this.HandleExpansion = this.HandleExpansion.bind(this);
        this.HandleExpansionAndVisiblePreview=this.HandleExpansionAndVisiblePreview.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.getMarkdownText = this.getMarkdownText.bind(this)
      }

    HandleExpansion(){
      this.setState({expanded: !this.state.expanded, visibleEditor: !this.state.visibleEditor})
    }
    HandleExpansionAndVisiblePreview(){
      this.setState({expanded: !this.state.expanded,VisiblePreview:!this.state.VisiblePreview})
    }
    handleChange(event) {
      this.setState({
        input: event.target.value
      });
  }
    
  getMarkdownText(){
    const md = this.state.input

    var rawMarkup = marked(md, {sanitize: false,tables: true });
    return { __html: rawMarkup };
    }
  
  

    render(){
      const html = this.getMarkdownText()
      const visibleEditor = this.state.visibleEditor
      const VisiblePreview = this.state.VisiblePreview

      return(
        <div id="kingDiv" className="kingDiv container-fluid">
          {VisiblePreview && <Editor 
          expanded = {this.state.expanded}
          HandleExpansion={this.HandleExpansion}
          input={this.state.input}
          handleChange={this.handleChange}
          />}
          
          {visibleEditor && <Previewer 
            expanded = {this.state.expanded} 
            HandleExpansionAndVisiblePreview={this.HandleExpansionAndVisiblePreview}
            input={this.state.input}
            html={html}/>}
        </div>
      );
    };
}

class Editor extends Component{
  constructor(props){
    super(props)
  }

  render(){
    const expanded = this.props.expanded;
          console.log(expanded)
      return(
        <div>
          <div id="myEditor-containerDiv" className={(expanded)? "myEditor-containerDiv2" :"myEditor-containerDiv"}>
            <div id="my-header" className="my-header">
              <div style={{display:"flex", flexDirection:"row", alignItems:"center",paddingTop:8}}>
                <div style={{width:30}}><i className="fab fa-free-code-camp"></i></div>
                <h4 style={{width:30, height:40, marginLeft:6, marginBottom:-11}} >Editor</h4>
            </div>
              <div style={{width:20}}>
                <i className={(expanded)?"fas fa-compress":"fas fa-expand-arrows-alt"} onClick={this.props.HandleExpansion}></i>
              </div>
            </div>
            <textarea  
              id="editor" 
              className = {(expanded)? "editor2" :"editor"}
              value = {this.props.input}
              onChange = {this.props.handleChange}
              >
            </textarea>
          </div>
        </div>
      );
  };
}

class Previewer extends Component{
  render(){
    const expanded = this.props.expanded;
    console.log(this.props.html)
  return(
    <div>
      <div id ="preview-container" className={(expanded)? "preview-container2" :"preview-container"}>
        <div id="preview-header" className="preview-header">
        <div style={{display:"flex", flexDirection:"row", alignItems:"center",paddingTop:8}}>
              <div style={{width:30}}><i className="fab fa-free-code-camp"></i></div>
              <h4 style={{width:30, height:40, marginLeft:6, marginBottom:-11}} >Previewer</h4>
          </div>
            <div style={{width:20}}>
              <i className={(expanded)?"fas fa-compress":"fas fa-expand-arrows-alt"} onClick={this.props.HandleExpansionAndVisiblePreview}></i>
            </div>
        </div>
        <div id="preview" className="preview" dangerouslySetInnerHTML={this.props.html}>
        </div>

      </div>
    </div>
  );
  }
}

export default MarkDownPreviewer;
