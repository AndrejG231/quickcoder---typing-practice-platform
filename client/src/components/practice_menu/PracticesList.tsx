import React, { FC, useState } from "react";
import { Dispatch } from "redux";
import { connect, ConnectedProps } from "react-redux";
import { selectCategory, selectPractice } from "../../redux/actions";
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
  selectedCategory: state.practiceSelection.selectedCategory,
  selectedPractice: state.practiceSelection.selectedPractice,
});

const rdxDispatch = (dispatch: Dispatch) => ({
  selectCategory: (category: number) => dispatch(selectCategory(category)),
  selectPractice: (practice: practiceItem) =>
    dispatch(selectPractice(practice)),
});

const withRedux = connect(rdxProps, rdxDispatch);

type props = ConnectedProps<typeof withRedux>;

const PracticesList: FC<props> = ({
  menu,
  selectPractice,
  selectCategory,
  selectedCategory,
  selectedPractice,
}) => {
  return (
    <PracticesWrapper>
      <CategoriesBar>
        {menu.map((category, index) => {
          return (
            <CategoryButton
              onClick={() => selectCategory(index)}
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
          {menu[selectedCategory].items.map((item, index) => {
            const isSelected = item === selectedPractice;
            return (
              <PracticeItem key={index} isSelected={isSelected}>
                <PracticeItemTitle>{item.name}</PracticeItemTitle>
                <PracticeItemDescription>
                  {item.description}
                </PracticeItemDescription>
                {isSelected ? null : (
                  <PracticeSelectIcon
                    size="60px"
                    onClick={() => selectPractice(item)}
                  />
                )}
              </PracticeItem>
            );
          })}
        </CategoryItems>
        <ItemsFade top />
        <ItemsFade bottom />
    </PracticesWrapper>
  );
};

export default withRedux(PracticesList);
