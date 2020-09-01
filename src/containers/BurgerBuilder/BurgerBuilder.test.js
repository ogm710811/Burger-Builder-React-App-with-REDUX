import React from "react";
import { configure, shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";

import { BurgerBuilder } from "./BurgerBuilder";
import BurgerControls from "../../components/Burger/BurgerControls/BurgerControls";
import Spinner from "../../components/UI/Spinner/Spinner";

configure({
  adapter: new Adapter(),
});

describe("<BurgerBuilder />", () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(<BurgerBuilder onLoadIngredients={() => {}} />);
  });
  it("should render <BurgerControls /> when receiving ingredients", function () {
    wrapper.setProps({ ingredients: { salad: 1 } });
    expect(wrapper.find(BurgerControls)).toHaveLength(1);
  });
  it("should render <Spinner /> when ingredients is null", function () {
    wrapper.setProps({ ingredients: null });
    expect(wrapper.find(Spinner)).toHaveLength(1);
  });
});
