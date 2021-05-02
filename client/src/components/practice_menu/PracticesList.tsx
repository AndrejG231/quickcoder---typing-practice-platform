import React, { FC, useState } from "react";
import { practiceMenu } from "../../types";
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

interface PracticesListProps {
  menu: practiceMenu;
}

const PracticesList: FC<PracticesListProps> = ({ menu }) => {
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
            <PracticeSelectIcon size="60px" />
          </PracticeItem>
        ))}
      </CategoryItems>
      <ItemsFade top />
      <ItemsFade bottom />
    </PracticesWrapper>
  );
};

export default PracticesList;
