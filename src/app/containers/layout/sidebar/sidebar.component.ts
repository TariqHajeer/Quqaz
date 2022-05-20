import {
  Component,
  OnInit,
  OnDestroy,
  HostListener,
  Input,
} from '@angular/core';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';
import { filter, map } from 'rxjs/operators';
import { SidebarService, ISidebar } from './sidebar.service';
import menuItems, { agentmenu, IMenuItem } from 'src/app/constants/menu';
import { Subscription } from 'rxjs';
import { UserPermission } from 'src/app/shared/auth.roles';
import { NotificationsService, NotificationType } from 'angular2-notifications';
import { UserLogin } from 'src/app/Models/userlogin.model';
import { StatisticsService } from 'src/app/services/statistics.service';
import { SignalRService } from 'src/app/services/signal-r.service';
import { AdminNotification } from 'src/app/Models/admin-notification.model';
@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
})
export class SidebarComponent implements OnInit, OnDestroy {
  menuItems: IMenuItem[] = [];
  selectedParentMenu = '';
  viewingParentMenu = '';
  currentUrl: string;
  private permissionlocalStorageKey: string = 'permissions';

  sidebar: ISidebar;
  subscription: Subscription;
  closedCollapseList = [];

  currentUserPermissions: any = JSON.parse(
    localStorage.getItem(this.permissionlocalStorageKey)
  );
  userlogin: UserLogin = JSON.parse(
    localStorage.getItem('kokazUser')
  ) as UserLogin;

  public AdminNotification: AdminNotification = new AdminNotification();

  constructor(
    private router: Router,
    private sidebarService: SidebarService,
    private activatedRoute: ActivatedRoute,
    private notifications: NotificationsService,
    private statisticsService: StatisticsService,
    private signalRService: SignalRService
  ) {
    this.currentUserPermissions = this.userlogin.privileges;
    if (this.userlogin.policy == 'Employee') this.menuItems = menuItems;
    else this.menuItems = agentmenu;
    this.subscription = this.sidebarService.getSidebar().subscribe(
      (res) => {
        this.sidebar = res;
      },
      (err) => {
        console.error(`An error occurred: ${err.message}`);
      }
    );
    this.router.events
      .pipe(
        filter((event) => event instanceof NavigationEnd),
        map(() => this.activatedRoute),
        map((route) => {
          while (route.firstChild) {
            route = route.firstChild;
          }
          return route;
        })
      )
      .subscribe((event) => {
        const path = this.router.url.split('?')[0];
        const paramtersLen = Object.keys(event.snapshot.params).length;
        const pathArr = path
          .split('/')
          .slice(0, path.split('/').length - paramtersLen);
        this.currentUrl = pathArr.join('/');
      });

    router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => {
        const { containerClassnames } = this.sidebar;
        this.selectMenu();
        this.toggle();
        this.sidebarService.setContainerClassnames(
          0,
          containerClassnames,
          this.sidebar.selectedMenuHasSubItems
        );
        window.scrollTo(0, 0);
      });
  }
  Notfiaction() {
    this.signalRService.startConnection();
    this.signalRService.hubConnection.on(
      'AdminNotification',
      (data: AdminNotification) => {
        if (data.newEditRquests > -1) {
          this.signalRService.AdminNotification.newEditRquests =
            data.newEditRquests;
          if (this.signalRService.AdminNotification.newEditRquests > 0) {
            let message =
              ' لديك ' +
              this.signalRService.AdminNotification.newEditRquests +
              ' من طلبات تعديل العملاء الجديدة';
            this.notifications.create('', message, NotificationType.Info, {
              theClass: 'info',
              timeOut: 6000,
              showProgressBar: false,
            });
          }
        }
        if (data.newOrdersCount > -1) {
          this.signalRService.AdminNotification.newOrdersCount =
            data.newOrdersCount;
          if (this.signalRService.AdminNotification.newOrdersCount > 0) {
            let message =
              ' لديك ' +
              this.signalRService.AdminNotification.newOrdersCount +
              ' من الطلبات جديدة';
            this.notifications.create('', message, NotificationType.Info, {
              theClass: 'info',
              timeOut: 6000,
              showProgressBar: false,
            });
          }
        }
        if (data.newPaymentRequetsCount > -1) {
          this.signalRService.AdminNotification.newPaymentRequetsCount =
            data.newPaymentRequetsCount;
          if (
            this.signalRService.AdminNotification.newPaymentRequetsCount > 0
          ) {
            let message =
              ' لديك ' +
              this.signalRService.AdminNotification.newPaymentRequetsCount +
              ' من طلبات دفع العملاء الجديدة';
            this.notifications.create('', message, NotificationType.Info, {
              theClass: 'info',
              timeOut: 6000,
              showProgressBar: false,
            });
          }
        }
        if (data.orderRequestEditStateCount > -1) {
          this.signalRService.AdminNotification.orderRequestEditStateCount =
            data.orderRequestEditStateCount;
          if (
            this.signalRService.AdminNotification.orderRequestEditStateCount > 0
          ) {
            let message =
              ' لديك ' +
              this.signalRService.AdminNotification.orderRequestEditStateCount +
              'من طلبات تعديل المندوب على حالة الشحنة';
            this.notifications.create('', message, NotificationType.Info, {
              theClass: 'info',
              timeOut: 6000,
              showProgressBar: false,
            });
          }
        }
        if (data.newOrdersDontSendCount > -1) {
          this.signalRService.AdminNotification.newOrdersDontSendCount =
            data.newOrdersDontSendCount;
          if (
            this.signalRService.AdminNotification.newOrdersDontSendCount > 0
          ) {
            let message =
              ' لديك ' +
              this.signalRService.AdminNotification.newOrdersDontSendCount +
              ' من الطلبات جديدة التي لم يتم ارسالها';
            this.notifications.create('', message, NotificationType.Info, {
              theClass: 'info',
              timeOut: 6000,
              showProgressBar: false,
            });
          }
        }
      }
    );
    setTimeout(() => {
      this.statisticsService.Notification().subscribe((data) => {
        this.signalRService.AdminNotification = data;
        if (this.signalRService.AdminNotification.newEditRquests > 0) {
          let message =
            ' لديك ' +
            this.signalRService.AdminNotification.newEditRquests +
            ' من طلبات تعديل العملاء الجديدة';
          this.notifications.create('', message, NotificationType.Info, {
            theClass: 'info',
            timeOut: 6000,
            showProgressBar: false,
          });
        }
        if (this.signalRService.AdminNotification.newOrdersCount > 0) {
          let message =
            ' لديك ' +
            this.signalRService.AdminNotification.newOrdersCount +
            ' من الطلبات جديدة';
          this.notifications.create('', message, NotificationType.Info, {
            theClass: 'info',
            timeOut: 6000,
            showProgressBar: false,
          });
        }
        if (this.signalRService.AdminNotification.newPaymentRequetsCount > 0) {
          let message =
            ' لديك ' +
            this.signalRService.AdminNotification.newPaymentRequetsCount +
            ' من طلبات دفع العملاء الجديدة';
          this.notifications.create('', message, NotificationType.Info, {
            theClass: 'info',
            timeOut: 6000,
            showProgressBar: false,
          });
        }
        if (
          this.signalRService.AdminNotification.orderRequestEditStateCount > 0
        ) {
          let message =
            ' لديك ' +
            this.signalRService.AdminNotification.orderRequestEditStateCount +
            'من طلبات تعديل المندوب على حالة الشحنة';
          this.notifications.create('', message, NotificationType.Info, {
            theClass: 'info',
            timeOut: 6000,
            showProgressBar: false,
          });
        }
        if (this.signalRService.AdminNotification.newOrdersDontSendCount > 0) {
          let message =
            ' لديك ' +
            this.signalRService.AdminNotification.newOrdersDontSendCount +
            ' من الطلبات جديدة التي لم يتم ارسالها';
          this.notifications.create('', message, NotificationType.Info, {
            theClass: 'info',
            timeOut: 6000,
            showProgressBar: false,
          });
        }
      });
    }, 1000);
  }
  ngOnInit() {
    if (this.userlogin.policy == 'Employee') {
      this.Notfiaction();
    }

    setTimeout(() => {
      this.selectMenu();
      const { containerClassnames } = this.sidebar;
      const nextClasses = this.getMenuClassesForResize(containerClassnames);
      this.sidebarService.setContainerClassnames(
        0,
        nextClasses.join(' '),
        this.sidebar.selectedMenuHasSubItems
      );
      this.isCurrentMenuHasSubItem();
    }, 100);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  selectMenu() {
    this.selectedParentMenu = this.findParentInPath(this.currentUrl) || '';
    this.isCurrentMenuHasSubItem();
  }

  findParentInPath(path) {
    const foundedMenuItem = this.menuItems.find((x) => x.to === path);
    if (!foundedMenuItem) {
      if (path.split('/').length > 1) {
        const pathArr = path.split('/');
        return this.findParentInPath(
          pathArr.slice(0, pathArr.length - 1).join('/')
        );
      } else {
        return undefined;
      }
    } else {
      return path;
    }
  }

  isCurrentMenuHasSubItem() {
    const { containerClassnames } = this.sidebar;

    const menuItem = this.menuItems.find(
      (x) => x.to === this.selectedParentMenu
    );
    const isCurrentMenuHasSubItem =
      menuItem && menuItem.subs && menuItem.subs.length > 0 ? true : false;
    if (isCurrentMenuHasSubItem !== this.sidebar.selectedMenuHasSubItems) {
      if (!isCurrentMenuHasSubItem) {
        this.sidebarService.setContainerClassnames(
          0,
          containerClassnames,
          false
        );
      } else {
        this.sidebarService.setContainerClassnames(
          0,
          containerClassnames,
          true
        );
      }
    }
    return isCurrentMenuHasSubItem;
  }

  changeSelectedParentHasNoSubmenu(parentMenu: string) {
    const { containerClassnames } = this.sidebar;
    this.selectedParentMenu = parentMenu;
    this.viewingParentMenu = parentMenu;
    this.sidebarService.changeSelectedMenuHasSubItems(false);
    this.sidebarService.setContainerClassnames(0, containerClassnames, false);
  }

  openSubMenu(event: { stopPropagation: () => void }, menuItem: IMenuItem) {
    if (event) {
      event.stopPropagation();
    }
    const { containerClassnames, menuClickCount } = this.sidebar;

    const selectedParent = menuItem.to;
    const hasSubMenu = menuItem.subs && menuItem.subs.length > 0;
    this.sidebarService.changeSelectedMenuHasSubItems(hasSubMenu);
    if (!hasSubMenu) {
      this.viewingParentMenu = selectedParent;
      this.selectedParentMenu = selectedParent;
      this.toggle();
    } else {
      const currentClasses = containerClassnames
        ? containerClassnames.split(' ').filter((x) => x !== '')
        : '';

      if (!currentClasses.includes('menu-mobile')) {
        if (
          currentClasses.includes('menu-sub-hidden') &&
          (menuClickCount === 2 || menuClickCount === 0)
        ) {
          this.sidebarService.setContainerClassnames(
            3,
            containerClassnames,
            hasSubMenu
          );
        } else if (
          currentClasses.includes('menu-hidden') &&
          (menuClickCount === 1 || menuClickCount === 3)
        ) {
          this.sidebarService.setContainerClassnames(
            2,
            containerClassnames,
            hasSubMenu
          );
        } else if (
          currentClasses.includes('menu-default') &&
          !currentClasses.includes('menu-sub-hidden') &&
          (menuClickCount === 1 || menuClickCount === 3)
        ) {
          this.sidebarService.setContainerClassnames(
            0,
            containerClassnames,
            hasSubMenu
          );
        }
      } else {
        this.sidebarService.addContainerClassname(
          'sub-show-temporary',
          containerClassnames
        );
      }
      this.viewingParentMenu = selectedParent;
    }
  }

  toggle() {
    const { containerClassnames, menuClickCount } = this.sidebar;
    const currentClasses = containerClassnames
      .split(' ')
      .filter((x) => x !== '');
    if (currentClasses.includes('menu-sub-hidden') && menuClickCount === 3) {
      this.sidebarService.setContainerClassnames(
        2,
        containerClassnames,
        this.sidebar.selectedMenuHasSubItems
      );
    } else if (
      currentClasses.includes('menu-hidden') ||
      currentClasses.includes('menu-mobile')
    ) {
      if (!(menuClickCount === 1 && !this.sidebar.selectedMenuHasSubItems)) {
        this.sidebarService.setContainerClassnames(
          0,
          containerClassnames,
          this.sidebar.selectedMenuHasSubItems
        );
      }
    }
  }

  toggleCollapse(id: string) {
    if (this.closedCollapseList.includes(id)) {
      this.closedCollapseList = this.closedCollapseList.filter((x) => x !== id);
    } else {
      this.closedCollapseList.push(id);
    }
  }

  getMenuClassesForResize(classes: string) {
    let nextClasses = classes.split(' ').filter((x: string) => x !== '');
    const windowWidth = window.innerWidth;

    if (windowWidth < this.sidebarService.menuHiddenBreakpoint) {
      nextClasses.push('menu-mobile');
    } else if (windowWidth < this.sidebarService.subHiddenBreakpoint) {
      nextClasses = nextClasses.filter((x: string) => x !== 'menu-mobile');
      if (
        nextClasses.includes('menu-default') &&
        !nextClasses.includes('menu-sub-hidden')
      ) {
        nextClasses.push('menu-sub-hidden');
      }
    } else {
      nextClasses = nextClasses.filter((x: string) => x !== 'menu-mobile');
      if (
        nextClasses.includes('menu-default') &&
        nextClasses.includes('menu-sub-hidden')
      ) {
        nextClasses = nextClasses.filter(
          (x: string) => x !== 'menu-sub-hidden'
        );
      }
    }
    return nextClasses;
  }

  @HostListener('document:click', ['$event'])
  handleDocumentClick(event) {
    this.viewingParentMenu = '';
    this.selectMenu();
    this.toggle();
  }

  @HostListener('window:resize', ['$event'])
  handleWindowResize(event) {
    if (event && !event.isTrusted) {
      return;
    }
    const { containerClassnames } = this.sidebar;
    const nextClasses = this.getMenuClassesForResize(containerClassnames);
    this.sidebarService.setContainerClassnames(
      0,
      nextClasses.join(' '),
      this.sidebar.selectedMenuHasSubItems
    );
    this.isCurrentMenuHasSubItem();
  }

  menuClicked(e: MouseEvent) {
    e.stopPropagation();
  }

  filteredMenuItems(menuItems: IMenuItem[]) {
    if (menuItems)
      menuItems.forEach((item) => {
        if (
          (item.to == '/app/client' ||
            item.to == '/app/payment/paymentrequest/') &&
          item.badge
        ) {
          item.badgeLable =
            this.signalRService.AdminNotification.newPaymentRequetsCount;
        }
        if (item.to == '/app/order' && item.badge) {
          item.badgeLable =
            this.signalRService.AdminNotification.newOrdersCount +
            this.signalRService.AdminNotification.newOrdersDontSendCount +
            this.signalRService.AdminNotification.orderRequestEditStateCount;
        }
        if (item.to == '/app/order/neworders' && item.badge) {
          item.badgeLable =
            this.signalRService.AdminNotification.newOrdersCount;
        }
        if (item.to == '/app/order/orderswithclient' && item.badge) {
          item.badgeLable =
            this.signalRService.AdminNotification.newOrdersDontSendCount;
        }
        if (item.to == '/app/reports/agentOrderstaterequests' && item.badge) {
          item.badgeLable =
            this.signalRService.AdminNotification.orderRequestEditStateCount;
        }
        item.enabled = true;
        if (this.userlogin.haveTreasury) {
          item.enabled = true;
        } else if (
          (item.to == '/app/reports/ReceiptfReceivingShipment' ||
            item.to == '/app/reports/Shipmentsnotbeendelivered' ||
            item.to == '/app/reports/receiptsandexchanges' ||
            item.to == '/app/income' ||
            item.to == '/app/outcome') &&
          !this.userlogin.haveTreasury
        ) {
          item.enabled = false;
        }
      });
    // filter the menu by role
    return menuItems
      ? menuItems.filter(
          (x) =>
            !x.permission ||
            (x.permission &&
              this.currentUserPermissions.some((per) =>
                x.permission.includes(per.sysName)
              ))
        )
      : [];
  }
}
