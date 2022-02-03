import * as React from "react";
import {
    AppNavBar, NavItemT,setItemActive
} from "baseui/app-nav-bar";
import { styled } from "baseui";

const StyledDiv = styled("div", ()=>{
    return{
      overflowX:'hidden'
    }
  })

const Header = () => {
    const [mainItems, setMainItems] = React.useState<NavItemT[]>([
        {label: 'label', info: {id: 1}},
        {label: 'label', info: {id: 2}},
        {label: 'label', info: {id: 3}},
        {label: 'label', info: {id: 4}}
      ]);



    function getUniqueIdentifier(item: NavItemT) {
        if (item.info) {
          return item.info.id;
        }
        return item.label;
      }

    function handleMainItemSelect(item: NavItemT) {
        setMainItems(prev =>
          setItemActive(prev, item, getUniqueIdentifier),
        );
      }
    return (
        <StyledDiv>
             <AppNavBar
            title="Star wars Characters"
            mainItems={mainItems}
           onMainItemSelect={handleMainItemSelect}
        />

        </StyledDiv>
        
    );
}

export default Header
