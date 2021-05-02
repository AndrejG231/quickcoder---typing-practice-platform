import React, { FC, useState } from "react";
import { Dispatch } from "redux";
import { connect } from "react-redux";
import { selectPractice } from "../../redux/actions";
import { practiceItem, practiceMenu, reduxStore } from "../../types";
import {
  CategoriesBar,
  CategoryButton,
  CategoryDescription,
  CategoryItems,
  PracticeItem,
  PracticeItemTitle,
  PracticeItemDescription,
  PracticeSelectIcon,
  ItemsFade,
  PracticesWrapper,
} from "./practices_list";

const rdxProps = (state: reduxStore) => ({
  menu: state.practiceMenu,
});

const rdxDispatch = (dispatch: Dispatch) => ({
  selectPractice: (practice: practiceItem) =>
    dispatch(selectPractice(practice)),
});

interface PracticesListProps {
  menu: practiceMenu;
  selectPractice: (practice: practiceItem) => void;
}

const PracticesList: FC<PracticesListProps> = ({ menu, selectPractice }) => {
  const [selectedCategory, setSelectedCategory] = useState(0);
  return (
    <PracticesWrapper>
      <CategoriesBar>
        {menu.map((category, index) => {
          return (
            <CategoryButton
              onClick={() => setSelectedCategory(index)}
              key={index}
              isSelected={index === selectedCategory}
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
            <PracticeSelectIcon
              size="60px"
              onClick={() => selectPractice(item)}
            />
          </PracticeItem>
        ))}
      </CategoryItems>
      <ItemsFade top />
      <ItemsFade bottom />
    </PracticesWrapper>
  );
};

export default connect(rdxProps, rdxDispatch)(PracticesList);
