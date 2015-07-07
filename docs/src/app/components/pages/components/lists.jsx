let React = require('react');
let mui = require('material-ui');
let ComponentDoc = require('../../component-doc');
let MobileTearSheet = require('../../mobile-tear-sheet');
let ActionAssignment = require('svg-icons/action/assignment');
let ActionGrade = require('svg-icons/action/grade');
let ActionInfo = require('svg-icons/action/info');
let CommunicationCall = require('svg-icons/communication/call');
let CommunicationChatBubble = require('svg-icons/communication/chat-bubble');
let CommunicationEmail = require('svg-icons/communication/email');
let ContentDrafts = require('svg-icons/content/drafts');
let ContentInbox = require('svg-icons/content/inbox');
let ContentSend = require('svg-icons/content/send');
let EditorInsertChart = require('svg-icons/editor/insert-chart');
let FileFolder = require('svg-icons/file/folder');
let MoreVertIcon = require('svg-icons/navigation/more-vert');
let ToggleStarBorder = require('svg-icons/toggle/star-border');

let {
  Avatar,
  Checkbox,
  IconButton,
  List,
  ListDivider,
  ListItem,
  Styles,
  Toggle
} = mui;

let IconMenu = require('menus/icon-menu');
let MenuItem = require('menus/menu-item');

let { Colors } = Styles;


class ListsPage extends React.Component {

  constructor() {
    super();
  }

  render() {
    let code = `
      //First Example
      <List>
        <ListItem leftIcon={<ContentInbox />}>Inbox</ListItem>
        <ListItem leftIcon={<ActionGrade />}>Starred</ListItem>
        <ListItem leftIcon={<ContentSend />}>Sent mail</ListItem>
        <ListItem leftIcon={<ContentDrafts />}>Drafts</ListItem>
      </List>
      <ListDivider />
      <List>
        <ListItem rightIcon={<ActionInfo />}>All mail</ListItem>
        <ListItem rightIcon={<ActionInfo />}>Trash</ListItem>
        <ListItem rightIcon={<ActionInfo />}>Spam</ListItem>
        <ListItem rightIcon={<ActionInfo />}>Follow up</ListItem>
      </List>

      //Last Example
      <List subheader="Today">
        <ListItem
          leftAvatar={<Avatar src="images/ok-128.jpg" />}
          rightIconButton={<IconButton><ToggleStarBorder color={Colors.grey400} /></IconButton>}
          secondaryText={
            <p>
              <span style={{color: Colors.darkBlack}}>Brunch this weekend?</span><br/>
              I&apos;ll be in your neighborhood doing errands this weekend.
              Do you want to grab brunch?
            </p>
          }
          secondaryTextLines={2}>
          Brendan Lim
        </ListItem>
        <ListDivider inset={true} />
        <ListItem
          leftAvatar={<Avatar src="images/kolage-128.jpg" />}
          rightIconButton={<IconButton><ToggleStarBorder color={Colors.grey400} /></IconButton>}
          secondaryText={
            <p>
              <span style={{color: Colors.darkBlack}}>Summer BBQ</span><br/>
              Wish I could come, but I&apos;m out of town this weekend.
            </p>
          }
          secondaryTextLines={2}>
          me, Scott, Jennifer
        </ListItem>
        <ListDivider inset={true} />
        <ListItem
          leftAvatar={<Avatar src="images/uxceo-128.jpg" />}
          rightIconButton={<IconButton><ToggleStarBorder color={Colors.grey400} /></IconButton>}
          secondaryText={
            <p>
              <span style={{color: Colors.darkBlack}}>Oui oui</span><br/>
              Do you have any Paris recs? Have you ever been?
            </p>
          }
          secondaryTextLines={2}>
          Grace Ng
        </ListItem>
        <ListDivider inset={true} />
        <ListItem
          leftAvatar={<Avatar src="images/kerem-128.jpg" />}
          rightIconButton={<IconButton><ToggleStarBorder color={Colors.grey400} /></IconButton>}
          secondaryText={
            <p>
              <span style={{color: Colors.darkBlack}}>Birthday gift</span><br/>
              Do you have any ideas what we can get Heidi for her birthday? How about a pony?
            </p>
          }
          secondaryTextLines={2}>
          Kerem Suer
        </ListItem>
        <ListDivider inset={true} />
        <ListItem
          leftAvatar={<Avatar src="images/raquelromanp-128.jpg" />}
          rightIconButton={<IconButton><ToggleStarBorder color={Colors.grey400} /></IconButton>}
          secondaryText={
            <p>
              <span style={{color: Colors.darkBlack}}>Recipe to try</span><br/>
              We should eat this: grated squash. Corn and tomatillo tacos.
            </p>
          }
          secondaryTextLines={2}>
          Raquel Parrado
        </ListItem>
      </List>

      // Nested List Items
      <MobileTearSheet>
        <List subheader="Nested List Items">
          <ListItem leftIcon={<ContentSend />}>Sent mail</ListItem>
          <ListItem leftIcon={<ContentDrafts />}>Drafts</ListItem>
          <ListItem leftIcon={<ContentInbox />}>
            Inbox
            <ListItem leftIcon={<ActionGrade />}>Starred</ListItem>
            <ListItem leftIcon={<ContentSend />}>
              Sent Mail
              <ListItem leftIcon={<ContentDrafts />}>Drafts</ListItem>
            </ListItem>
          </ListItem>
        </List>
      </MobileTearSheet>
    `;

    let componentInfo = [
      {
        name: 'List Props',
        infoArray: [
          {
            name: 'insetSubheader',
            type: 'bool',
            header: 'default: false',
            desc: 'If true, the subheader will be indented by 72px.'
          },
          {
            name: 'subheader',
            type: 'string',
            header: 'optional',
            desc: 'The subheader string that will be displayed at the top of the list.'
          },
          {
            name: 'subheaderStyle',
            type: 'object',
            header: 'optional',
            desc: 'The style object to override subheader styles.'
          }
        ]
      },
      {
        name: 'ListItem Props',
        infoArray: [
          {
            name: 'disabled',
            type: 'bool',
            header: 'default: false',
            desc: 'If true, the list-item will not be clickable and will not display hover affects. This is automatically disabled if leftCheckbox or rightToggle is set.'
          },
          {
            name: 'insetChildren',
            type: 'bool',
            header: 'default: false',
            desc: 'If true, the children will be indented by 72px. Only needed if there is no left avatar or left icon.'
          },
          {
            name: 'leftAvatar',
            type: 'element',
            header: 'optional',
            desc: 'This is the Avatar element to be displayed on the left side.'
          },
          {
            name: 'leftCheckbox',
            type: 'element',
            header: 'optional',
            desc: 'This is the Checkbox element to be displayed on the left side.'
          },
          {
            name: 'leftIcon',
            type: 'element',
            header: 'optional',
            desc: 'This is the SvgIcon or FontIcon to be displayed on the left side.'
          },
          {
            name: 'nestedLevel',
            type: 'integer',
            header: 'optional',
            desc: 'Controls how deep a ListItem appears. This property is automatically managed so modify at your own risk.'
          },
          {
            name: 'open',
            type: 'boolean',
            header: 'default: false',
            desc: 'Controls whether or not the child ListItems are initially displayed.'
          },
          {
            name: 'rightAvatar',
            type: 'element',
            header: 'optional',
            desc: 'This is the avatar element to be displayed on the right side.'
          },
          {
            name: 'rightIcon',
            type: 'element',
            header: 'optional',
            desc: 'This is the SvgIcon or FontIcon to be displayed on the right side.'
          },
          {
            name: 'rightIconButton',
            type: 'element',
            header: 'optional',
            desc: 'This is the IconButton to be displayed on the right side. Hovering over this button will ' +
              'remove the ListItem hover. Also, clicking on this button will not trigger a ListItem ripple. The ' +
              'event will be stopped and prevented from bubbling up to cause a ListItem click.'
          },
          {
            name: 'rightToggle',
            type: 'element',
            header: 'optional',
            desc: 'This is the Toggle element to display on the right side.'
          },
          {
            name: 'secondaryText',
            type: 'node',
            header: 'optional',
            desc: 'This is the block element that contains the secondary text. If a string is passed in, a paragraph tag will be rendered.'
          },
          {
            name: 'secondaryTextLines',
            type: 'oneOf [1,2]',
            header: 'default: 1',
            desc: 'Can be 1 or 2. This is the number of secondary text lines before ellipsis will show.'
          },
          {
            name: 'useCustomNestedListHandler',
            type: 'boolean',
            header: 'default: false',
            desc: 'If you want to use a custom toggle handler for the nested list, provide true. If you want the leftIcon (for example) to toggle between icons specify true so that a open/close button us not autogenerated. If you specify true, you will need to manage the open/close state via the open property.'
          }
        ]
      },
      {
        name: 'ListItem Events',
        infoArray: [
          {
            name: 'onKeyboardFocus',
            type: 'function(e, isKeyboardFocused)',
            header: 'optional',
            desc: 'Called when the ListItem has keyboard focus.'
          },
          {
            name: 'onMouseOut',
            type: 'function(e)',
            header: 'optional',
            desc: 'Called when the mouse is no longer over the ListItem.'
          },
          {
            name: 'onMouseOver',
            type: 'function(e)',
            header: 'optional',
            desc: 'Called when the mouse is over the ListItem.'
          },
          {
            name: 'onNestedListToggle',
            type: 'function(this)',
            header: 'optional',
            desc: 'Called when the ListItem toggles its nested ListItems.'
          },
          {
            name: 'onTouchStart',
            type: 'function(e)',
            header: 'optional',
            desc: 'Called when touches start.'
          }
        ]
      }
    ];

    let iconButtonElement = (
      <IconButton
        touch={true}
        tooltip="more"
        tooltipPosition="bottom-left">
        <MoreVertIcon color={Colors.grey400} />
      </IconButton>
    );

    let rightIconMenu = (
      <IconMenu iconButtonElement={iconButtonElement}>
        <MenuItem>Reply</MenuItem>
        <MenuItem>Forward</MenuItem>
        <MenuItem>Delete</MenuItem>
      </IconMenu>
    );

    return (
      <ComponentDoc
        name="Lists"
        code={code}
        componentInfo={componentInfo}>

        <MobileTearSheet>
          <List>
          <ListItem leftIcon={<ContentInbox />}>Inbox</ListItem>
            <ListItem leftIcon={<ActionGrade />}>Starred</ListItem>
            <ListItem leftIcon={<ContentSend />}>Sent mail</ListItem>
            <ListItem leftIcon={<ContentDrafts />}>Drafts</ListItem>
            <ListItem leftIcon={<ContentInbox />}>
              Inbox
              <ListItem leftIcon={<ActionGrade />}>Starred</ListItem>
              <ListItem leftIcon={<ContentSend />}>
                Sent Mail
                <ListItem leftIcon={<ContentDrafts />}>Drafts</ListItem>
              </ListItem>
            </ListItem>
          </List>
          <ListDivider />
          <List>
            <ListItem rightIcon={<ActionInfo />}>All mail</ListItem>
            <ListItem rightIcon={<ActionInfo />}>Trash</ListItem>
            <ListItem rightIcon={<ActionInfo />}>Spam</ListItem>
            <ListItem rightIcon={<ActionInfo />}>Follow up</ListItem>
          </List>
        </MobileTearSheet>

        <MobileTearSheet>
          <List subheader="Recent chats">
            <ListItem
              leftAvatar={<Avatar src="images/ok-128.jpg" />}
              rightIcon={<CommunicationChatBubble />}>
              Brendan Lim
            </ListItem>
            <ListItem
              leftAvatar={<Avatar src="images/kolage-128.jpg" />}
              rightIcon={<CommunicationChatBubble />}>
              Eric Hoffman
            </ListItem>
            <ListItem
              leftAvatar={<Avatar src="images/uxceo-128.jpg" />}
              rightIcon={<CommunicationChatBubble />}>
              Grace Ng
            </ListItem>
            <ListItem
              leftAvatar={<Avatar src="images/kerem-128.jpg" />}
              rightIcon={<CommunicationChatBubble />}>
              Kerem Suer
            </ListItem>
            <ListItem
              leftAvatar={<Avatar src="images/raquelromanp-128.jpg" />}
              rightIcon={<CommunicationChatBubble />}>
              Raquel Parrado
            </ListItem>
          </List>
          <ListDivider />
          <List subheader="Previous chats">
            <ListItem
              leftAvatar={<Avatar src="images/chexee-128.jpg" />}>
              Chelsea Otakan
            </ListItem>
            <ListItem
              leftAvatar={<Avatar src="images/jsa-128.jpg" />}>
              James Anderson
            </ListItem>
          </List>
        </MobileTearSheet>

        <MobileTearSheet>
          <List>
            <ListItem
              leftIcon={<ActionGrade color={Colors.pinkA200} />}
              rightAvatar={<Avatar src="images/chexee-128.jpg" />}>
              Chelsea Otakan
            </ListItem>
            <ListItem
              insetChildren={true}
              rightAvatar={<Avatar src="images/kolage-128.jpg" />}>
              Eric Hoffman
            </ListItem>
            <ListItem
              insetChildren={true}
              rightAvatar={<Avatar src="images/jsa-128.jpg" />}>
              James Anderson
            </ListItem>
            <ListItem
              insetChildren={true}
              rightAvatar={<Avatar src="images/kerem-128.jpg" />}>
              Kerem Suer
            </ListItem>
          </List>
          <ListDivider inset={true} />
          <List>
            <ListItem
              leftAvatar={<Avatar color={Colors.pinkA200} backgroundColor={Colors.transparent} style={{left:8}}>A</Avatar>}
              rightAvatar={<Avatar src="images/adellecharles-128.jpg" />}>
              Adelle Charles
            </ListItem>
            <ListItem
              insetChildren={true}
              rightAvatar={<Avatar src="images/adhamdannaway-128.jpg" />}>
              Adham Dannaway
            </ListItem>
            <ListItem
              insetChildren={true}
              rightAvatar={<Avatar src="images/allisongrayce-128.jpg" />}>
              Allison Grayce
            </ListItem>
            <ListItem
              insetChildren={true}
              rightAvatar={<Avatar src="images/angelceballos-128.jpg" />}>
              Angel Ceballos
            </ListItem>
          </List>
        </MobileTearSheet>

        <MobileTearSheet>
          <List subheader="Folders" insetSubheader={true}>
            <ListItem
              leftAvatar={<Avatar icon={<FileFolder />} />}
              rightIcon={<ActionInfo />}
              secondaryText="Jan 9, 2014">
              Photos
            </ListItem>
            <ListItem
              leftAvatar={<Avatar icon={<FileFolder />} />}
              rightIcon={<ActionInfo />}
              secondaryText="Jan 17, 2014">
              Recipes
            </ListItem>
            <ListItem
              leftAvatar={<Avatar icon={<FileFolder />} />}
              rightIcon={<ActionInfo />}
              secondaryText="Jan 28, 2014">
              Work
            </ListItem>
          </List>
          <ListDivider inset={true} />
          <List subheader="Files" insetSubheader={true}>
            <ListItem
              leftAvatar={<Avatar icon={<ActionAssignment />} backgroundColor={Colors.blue500} />}
              rightIcon={<ActionInfo />}
              secondaryText="Jan 20, 2014">
              Vacation itinerary
            </ListItem>
            <ListItem
              leftAvatar={<Avatar icon={<EditorInsertChart />} backgroundColor={Colors.yellow600} />}
              rightIcon={<ActionInfo />}
              secondaryText="Jan 10, 2014">
              Kitchen remodel
            </ListItem>
          </List>
        </MobileTearSheet>

        <MobileTearSheet>
          <List subheader="Nested List Items">
            <ListItem leftIcon={<ContentSend />}>Sent mail</ListItem>
            <ListItem leftIcon={<ContentDrafts />}>Drafts</ListItem>
            <ListItem leftIcon={<ContentInbox />} open={true}>
              Inbox
              <ListItem leftIcon={<ActionGrade />}>Starred</ListItem>
              <ListItem leftIcon={<ContentSend />}>
                Sent Mail
                <ListItem leftIcon={<ContentDrafts />}>Drafts</ListItem>
              </ListItem>
            </ListItem>
          </List>
        </MobileTearSheet>

        <MobileTearSheet>
          <List subheader="General">
            <ListItem
              secondaryText="Change your Google+ profile photo">
              Profile photo
            </ListItem>
            <ListItem
              secondaryText="Your status is visible to everyone you use with">
              Show your status
            </ListItem>
          </List>
          <ListDivider />
          <List subheader="Hangout notifications">
            <ListItem
              leftCheckbox={<Checkbox />}
              secondaryText="Allow notifications">
              Notifications
            </ListItem>
            <ListItem
              leftCheckbox={<Checkbox />}
              secondaryText="Hangouts message">
              Sounds
            </ListItem>
            <ListItem
              leftCheckbox={<Checkbox />}
              secondaryText="Hangouts video call">
              Video sounds
            </ListItem>
          </List>
        </MobileTearSheet>

        <MobileTearSheet>
          <List>
            <ListItem
              secondaryText="Always interrupt">
              When calls and notifications arrive
            </ListItem>
          </List>
          <ListDivider />
          <List subheader="Priority interruptions">
            <ListItem rightToggle={<Toggle />}>
              Events and reminders
            </ListItem>
            <ListItem rightToggle={<Toggle />}>
              Calls
            </ListItem>
            <ListItem rightToggle={<Toggle />}>
              Messages
            </ListItem>
          </List>
          <ListDivider />
          <List subheader="Hangout notifications">
            <ListItem
              leftCheckbox={<Checkbox />}>
              Notifications
            </ListItem>
            <ListItem
              leftCheckbox={<Checkbox />}>
              Sounds
            </ListItem>
            <ListItem
              leftCheckbox={<Checkbox />}>
              Video sounds
            </ListItem>
          </List>
        </MobileTearSheet>

        <MobileTearSheet>
          <List>
            <ListItem
              leftIcon={<CommunicationCall color={Colors.indigo500} />}
              rightIcon={<CommunicationChatBubble />}
              secondaryText="Mobile">
              (650) 555 - 1234
            </ListItem>
            <ListItem
              insetChildren={true}
              rightIcon={<CommunicationChatBubble />}
              secondaryText="Work">
              (323) 555-6789
            </ListItem>
          </List>
          <ListDivider inset={true} />
          <List>
            <ListItem
              leftIcon={<CommunicationEmail color={Colors.indigo500} />}
              secondaryText="Personal">
              aliconnors@example.com
            </ListItem>
            <ListItem
              insetChildren={true}
              secondaryText="Work">
              ali_connors@example.com
            </ListItem>
          </List>
        </MobileTearSheet>

        <MobileTearSheet>
          <List subheader="Today">
            <ListItem
              leftAvatar={<Avatar src="images/ok-128.jpg" />}
              secondaryText={
                <p>
                  <span style={{color: Colors.darkBlack}}>Brendan Lim</span> --
                  I&apos;ll be in your neighborhood this weekend.
                </p>
              }>
              Brunch this weekend?
            </ListItem>
            <ListDivider inset={true} />
            <ListItem
              leftAvatar={<Avatar src="images/kolage-128.jpg" />}
              secondaryText={
                <p>
                  <span style={{color: Colors.darkBlack}}>to me, Scott, Jennifer</span> --
                  Wish I could but I can
                </p>
              }>
              Summer BBQ&nbsp;&nbsp;<span style={{color: Colors.lightBlack}}>4</span>
            </ListItem>
            <ListDivider inset={true} />
            <ListItem
              leftAvatar={<Avatar src="images/uxceo-128.jpg" />}
              secondaryText={
                <p>
                  <span style={{color: Colors.darkBlack}}>Grace Ng</span> --
                  Do you have Paris recommendations?
                </p>
              }>
              Oui oui
            </ListItem>
            <ListDivider inset={true} />
            <ListItem
              leftAvatar={<Avatar src="images/kerem-128.jpg" />}
              secondaryText={
                <p>
                  <span style={{color: Colors.darkBlack}}>Kerem Suer</span> --
                  Do you have any ideas on what I
                </p>
              }>
              Birthday gift
            </ListItem>
            <ListDivider inset={true} />
            <ListItem
              leftAvatar={<Avatar src="images/raquelromanp-128.jpg" />}
              secondaryText={
                <p>
                  <span style={{color: Colors.darkBlack}}>Raquel Parrado</span> --
                  We should eat this: grated cheese
                </p>
              }>
              Recipe to try
            </ListItem>
            <ListDivider inset={true} />
            <ListItem
              leftAvatar={<Avatar src="images/chexee-128.jpg" />}
              secondaryText={
                <p>
                  <span style={{color: Colors.darkBlack}}>Chelsea Otakan</span> --
                  Any interest in seeing the Giants
                </p>
              }>
              Giants game
            </ListItem>
          </List>
        </MobileTearSheet>

        <MobileTearSheet>
          <List subheader="Today">
            <ListItem
              leftAvatar={<Avatar src="images/ok-128.jpg" />}
              secondaryText={
                <p>
                  <span style={{color: Colors.darkBlack}}>Brendan Lim</span> --
                  I&apos;ll be in your neighborhood doing errands this weekend. Do you want to grab brunch?
                </p>
              }
              secondaryTextLines={2}>
              Brunch this weekend?
            </ListItem>
            <ListDivider inset={true} />
            <ListItem
              leftAvatar={<Avatar src="images/kolage-128.jpg" />}
              secondaryText={
                <p>
                  <span style={{color: Colors.darkBlack}}>to me, Scott, Jennifer</span> --
                  Wish I could come, but I&apos;m out of town this weekend.
                </p>
              }
              secondaryTextLines={2}>
              Summer BBQ&nbsp;&nbsp;<span style={{color: Colors.lightBlack}}>4</span>
            </ListItem>
            <ListDivider inset={true} />
            <ListItem
              leftAvatar={<Avatar src="images/uxceo-128.jpg" />}
              secondaryText={
                <p>
                  <span style={{color: Colors.darkBlack}}>Grace Ng</span> --
                  Do you have Paris recommendations? Have you ever been?
                </p>
              }
              secondaryTextLines={2}>
              Oui oui
            </ListItem>
            <ListDivider inset={true} />
            <ListItem
              leftAvatar={<Avatar src="images/kerem-128.jpg" />}
              secondaryText={
                <p>
                  <span style={{color: Colors.darkBlack}}>Kerem Suer</span> --
                  Do you have any ideas what we can get Heidi for her birthday? How about a pony?
                </p>
              }
              secondaryTextLines={2}>
              Birthday gift
            </ListItem>
            <ListDivider inset={true} />
            <ListItem
              leftAvatar={<Avatar src="images/raquelromanp-128.jpg" />}
              secondaryText={
                <p>
                  <span style={{color: Colors.darkBlack}}>Raquel Parrado</span> --
                  We should eat this: grated squash. Corn and tomatillo tacos.
                </p>
              }
              secondaryTextLines={2}>
              Recipe to try
            </ListItem>
          </List>
        </MobileTearSheet>

        <MobileTearSheet>
          <List subheader="Today">
            <ListItem
              leftAvatar={<Avatar src="images/ok-128.jpg" />}
              rightIconButton={rightIconMenu}
              secondaryText={
                <p>
                  <span style={{color: Colors.darkBlack}}>Brunch this weekend?</span><br/>
                  I&apos;ll be in your neighborhood doing errands this weekend. Do you want to grab brunch?
                </p>
              }
              secondaryTextLines={2}>
              Brendan Lim
            </ListItem>
            <ListDivider inset={true} />
            <ListItem
              leftAvatar={<Avatar src="images/kolage-128.jpg" />}
              rightIconButton={rightIconMenu}
              secondaryText={
                <p>
                  <span style={{color: Colors.darkBlack}}>Summer BBQ</span><br/>
                  Wish I could come, but I&apos;m out of town this weekend.
                </p>
              }
              secondaryTextLines={2}>
              me, Scott, Jennifer
            </ListItem>
            <ListDivider inset={true} />
            <ListItem
              leftAvatar={<Avatar src="images/uxceo-128.jpg" />}
              rightIconButton={rightIconMenu}
              secondaryText={
                <p>
                  <span style={{color: Colors.darkBlack}}>Oui oui</span><br/>
                  Do you have any Paris recs? Have you ever been?
                </p>
              }
              secondaryTextLines={2}>
              Grace Ng
            </ListItem>
            <ListDivider inset={true} />
            <ListItem
              leftAvatar={<Avatar src="images/kerem-128.jpg" />}
              rightIconButton={rightIconMenu}
              secondaryText={
                <p>
                  <span style={{color: Colors.darkBlack}}>Birthday gift</span><br/>
                  Do you have any ideas what we can get Heidi for her birthday? How about a pony?
                </p>
              }
              secondaryTextLines={2}>
              Kerem Suer
            </ListItem>
            <ListDivider inset={true} />
            <ListItem
              leftAvatar={<Avatar src="images/raquelromanp-128.jpg" />}
              rightIconButton={rightIconMenu}
              secondaryText={
                <p>
                  <span style={{color: Colors.darkBlack}}>Recipe to try</span><br/>
                  We should eat this: grated squash. Corn and tomatillo tacos.
                </p>
              }
              secondaryTextLines={2}>
              Raquel Parrado
            </ListItem>
          </List>
        </MobileTearSheet>

      </ComponentDoc>
    );
  }

}

module.exports = ListsPage;
