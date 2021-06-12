import React, { FC, useState } from "react";
import { Dispatch } from "redux";
import { connect, ConnectedProps } from "react-redux";
import { selectCategory, selectPractice } from "../../redux/actions";
import { practiceMenuItem, reduxStore } from "../../types";
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
  ItemsContainer,
  PracticesWrapper,
  OverflowContainer,
} from "./practices_list";

const rdxProps = (state: reduxStore) => ({
  menu: state.practiceMenu,
  selectedCategory: state.practiceSelection.selectedCategory,
  selectedPractice: state.practiceSelection.selectedPractice,
});

const rdxDispatch = (dispatch: Dispatch) => ({
  selectCategory: (category: number) => dispatch(selectCategory(category)),
  selectPractice: (practice: practiceMenuItem) =>
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
      {/* Mapped categories from menu, selection handler */}
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
      {/* Container to hold overflow container and item faders at absolute position */}
      <ItemsContainer>
        {/* Container to provide scroll and items padding */}
        <OverflowContainer>
          {/* Mapped practices from menu and selection handling */}
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
        </OverflowContainer>
        {/* Item faders - smooth items appearing and disappearing */}
        <ItemsFade top />
        <ItemsFade bottom />
      </ItemsContainer>
    </PracticesWrapper>
  );
};

export default withRedux(PracticesList);
