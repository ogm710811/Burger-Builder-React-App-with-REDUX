import React from "react";
import { configure, shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import NavigationItems from "./NavigationItems";
import NavigationItem from "../NavigationItem/NavigationItem";

configure({
  adapter: new Adapter(),
});
describe("<NavigationItems />", () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(<NavigationItems />);
  });
  it("should render two <NavigationItem /> elements if not authenticated", function () {
    expect(wrapper.find(NavigationItem)).toHaveLength(2);
  });
  it("should render three <NavigationItem /> elements if is authenticated", function () {
    // wrapper = shallow(<NavigationItems isUserLoggedIn />);
    wrapper.setProps({ isUserLoggedIn: true });
    expect(wrapper.find(NavigationItem)).toHaveLength(3);
  });
  it("should render Logout <NavigationItem /> node if is authenticated", function () {
    wrapper.setProps({ isUserLoggedIn: true });
    expect(
      wrapper.contains(<NavigationItem link="/logout">Log Out</NavigationItem>)
    ).toEqual(true);
  });
  it("should not render Login <NavigationItem /> node if is authenticated", function () {
    wrapper.setProps({ isUserLoggedIn: true });
    expect(
      wrapper.contains(<NavigationItem link="/login">Log In</NavigationItem>)
    ).toEqual(false);
  });
});
