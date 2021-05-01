import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { loadMenu } from "../redux/actions";
import { reduxStore } from "../types";
import { getMenu } from "../api";
import { practiceMenu } from "../types/";
import {
  CategoriesBar,
  CategoryButton,
  CategoryDescription,
  CategoryItems,
  MenuWrapper,
  PracticeItem,
  PracticeItemDescription,
  PracticeItemTitle,
  PracticesContainer,
  PracticeSelectIcon,
} from "../components/practice_menu";

const rdxProps = (state: reduxStore) => {
  return { menu: state.practiceMenu };
};

const rdxDispatch = (dispatch: any) => {
  return {
    setMenu: (menu: practiceMenu) => dispatch(loadMenu(menu)),
  };
};

interface PracticeMenuProps {
  menu: practiceMenu;
  setMenu: (menu: practiceMenu) => void;
}

const PracticeMenu: React.FC<PracticeMenuProps> = ({ menu, setMenu }) => {
  const [selectedCategory, setSelectedCategory] = useState(0);

  useEffect(() => {
    if (!menu) {
      getMenu({
        onSuccess: (menu) => {
          setMenu(menu);
        },
        onError: () => null,
      });
    }
  }, [menu]);

  if (!menu) {
    return <div>Loading...</div>;
  }

  return (
    <MenuWrapper>
      <PracticesContainer>
        <CategoriesBar>
          {menu.map((category, index) => {
            return (
              <CategoryButton
                onClick={() => setSelectedCategory(index)}
                key={index}
              >
                {category.category}
              </CategoryButton>
            );
          })}
        </CategoriesBar>
        <CategoryDescription>
          {menu[selectedCategory].description}
        </CategoryDescription>
        <CategoryItems>
          {menu[selectedCategory].items.map((item, index) => (
            <PracticeItem key={index}>
              <PracticeItemTitle>{item.name}</PracticeItemTitle>
              <PracticeItemDescription>
                {item.description}
              </PracticeItemDescription>
              <PracticeSelectIcon size="20px" />
            </PracticeItem>
          ))}
        </CategoryItems>
      </PracticesContainer>
      {/* StatViewer */}
      {/* Selector */}
    </MenuWrapper>
  );
};

export default connect(rdxProps, rdxDispatch)(PracticeMenu);
