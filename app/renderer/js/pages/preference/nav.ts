import type {HTML} from "../../../../common/html";
import {html} from "../../../../common/html";
import * as t from "../../../../common/translation-util";
import BaseComponent from "../../components/base";

export type NavItem =
  | "General"
  | "Network"
  | "AddServer"
  | "Organizations"
  | "Shortcuts";

interface PreferenceNavProps {
  $root: Element;
  onItemSelected: (navItem: NavItem) => void;
}

export default class PreferenceNav extends BaseComponent {
  props: PreferenceNavProps;
  navItems: NavItem[];
  $el: Element;
  constructor(props: PreferenceNavProps) {
    super();
    this.props = props;
    this.navItems = [
      "General",
      "Network",
      "AddServer",
      "Organizations",
      "Shortcuts",
    ];
    this.init();
  }

  templateHTML(): HTML {
    const navItemsHTML = html``.join(
      this.navItems.map(
        (navItem) => html`
          <div class="nav" id="nav-${navItem}">${t.__(navItem)}</div>
        `,
      ),
    );

    return html`
      <div>
        <div id="settings-header">${t.__("Settings")}</div>
        <div id="nav-container">${navItemsHTML}</div>
      </div>
    `;
  }

  init(): void {
    this.$el = this.generateNodeFromHTML(this.templateHTML());
    this.props.$root.append(this.$el);
    this.registerListeners();
  }

  registerListeners(): void {
    for (const navItem of this.navItems) {
      const $item = document.querySelector(`#nav-${CSS.escape(navItem)}`);
      $item.addEventListener("click", () => {
        this.props.onItemSelected(navItem);
      });
    }
  }

  select(navItemToSelect: NavItem): void {
    for (const navItem of this.navItems) {
      if (navItem === navItemToSelect) {
        this.activate(navItem);
      } else {
        this.deactivate(navItem);
      }
    }
  }

  activate(navItem: NavItem): void {
    const $item = document.querySelector(`#nav-${CSS.escape(navItem)}`);
    $item.classList.add("active");
  }

  deactivate(navItem: NavItem): void {
    const $item = document.querySelector(`#nav-${CSS.escape(navItem)}`);
    $item.classList.remove("active");
  }
}
