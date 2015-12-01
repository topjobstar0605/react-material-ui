import React from 'react';
import {
  Avatar,
  FontIcon,
  List,
  ListItem,
  Styles,
  Paper,
} from 'material-ui';
import ComponentDoc from '../../component-doc';
import FileFolder from 'material-ui/svg-icons/file/folder';
const {Colors} = Styles;
import Code from 'avatars-code';
import CodeExample from '../../code-example/code-example';
import CodeBlock from '../../code-example/code-block';


export default class AvatarsPage extends React.Component {

  render() {

    let desc = null;

    let componentInfo = [
      {
        name: 'Props',
        infoArray: [
          {
            name: 'icon',
            type: 'element',
            header: 'optional',
            desc: 'This is the SvgIcon or FontIcon to be used inside the avatar.',
          },
          {
            name: 'backgroundColor',
            type: 'string',
            header: 'default: grey400',
            desc: 'The backgroundColor of the avatar. Does not apply to image avatars.',
          },
          {
            name: 'color',
            type: 'string',
            header: 'default: white',
            desc: 'The icon or letter color.',
          },
          {
            name: 'size',
            type: 'number',
            header: 'default: 40',
            desc: 'This is the size of the avatar in pixels',
          },
          {
            name: 'src',
            type: 'string',
            header: 'optional',
            desc: 'If passed in, this component will render an img element. Otherwise, a div will be rendered.',
          },
          {
            name: 'style',
            type: 'object',
            header: 'optional',
            desc: 'Override the inline-styles of the root element.',
          },
        ],
      },
    ];

    let imageAvatar = <Avatar src="images/uxceo-128.jpg" />;
    let svgAvatar = <Avatar icon={<FileFolder />} />;
    let customSvgAvatar = <Avatar icon={<FileFolder />} color={Colors.orange200} backgroundColor={Colors.pink400} />;
    let fontAvatar = <Avatar icon={<FontIcon className="muidocs-icon-communication-voicemail" />} />;
    let customFontAvatar = <Avatar icon={<FontIcon className="muidocs-icon-communication-voicemail" />} color={Colors.blue300} backgroundColor={Colors.indigo900} />;
    let letterAvatar = <Avatar>A</Avatar>;
    let customLetterAvatar = <Avatar color={Colors.deepOrange300} backgroundColor={Colors.purple500}>A</Avatar>;

    return (
      <ComponentDoc
        name="Avatars"
        desc={desc}
        componentInfo={componentInfo}>

        <Paper style = {{marginBottom: '22px'}}>
          <CodeBlock>
          {
            '//Import statement:\nimport Avatar from \'material-ui/lib/avatar\';\n\n' +
            '//See material-ui/lib/index.js for more\n'
          }
          </CodeBlock>
        </Paper>

        <CodeExample code={Code}>
          <List>
            <ListItem leftAvatar={imageAvatar} disabled={true}>Image Avatar</ListItem>
            <ListItem leftAvatar={svgAvatar} disabled={true}>SvgIcon Avatar</ListItem>
            <ListItem leftAvatar={customSvgAvatar} disabled={true}>SvgIcon Avatar with custom colors</ListItem>
            <ListItem leftAvatar={fontAvatar} disabled={true}>FontIcon Avatar</ListItem>
            <ListItem leftAvatar={customFontAvatar} disabled={true}>FontIcon Avatar with custom colors</ListItem>
            <ListItem leftAvatar={letterAvatar} disabled={true}>Letter Avatar</ListItem>
            <ListItem leftAvatar={customLetterAvatar} disabled={true}>Letter Avatar with custom colors</ListItem>
          </List>
        </CodeExample>
      </ComponentDoc>
    );

  }

}
