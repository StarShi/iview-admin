<template>
    <div id="app" class='container'>
        <Sider ref="menuSide" hide-trigger collapsible :collapsed-width="collapsedWidth" v-model="isCollapsed"
               :width="showWidth" :style="{position: 'fixed', height: '100vh', left: 0, overflow: 'auto',zIndex:9999}"
               class="menu-side-scoller">
            <div class="admin-title" @click="adminTitleClick">
                <span v-show="!isCollapsed">后台管理</span>
                <img v-show="isCollapsed" src="@/assets/images/logo.png" alt="">
            </div>
            <Menu :theme="theme" accordion width="auto" :class="menuitemClasses" @on-select="menuSelect">
                <Submenu v-for="(item,index) in menuItems" :key="index" :name="item.name">
                    <template slot="title">
                        <Icon :type="item.icon"/>
                        <span v-show="!isCollapsed">{{item.name}}</span>
                    </template>
                    <MenuItem v-for="(item_sub,index_sub) in item.subItem"
                              :name="item.name +'/'+item.icon+'~'+ item_sub.name+'/'+item_sub.icon"
                              :style="menuitemStyle"
                              :key="index_sub"
                              :to="item_sub.url">
                        <Icon v-show="!isCollapsed" :type="item_sub.icon"/>
                        {{item_sub.name}}
                    </MenuItem>
                </Submenu>
            </Menu>
        </Sider>
        <Layout :style="{marginLeft:(isCollapsed?collapsedWidth:showWidth)+'px'}"
                style="transition:margin-left .2s ease .1s">
            <Header class="layout-header-bar">
                <Icon @click.native="collapsedSider" class='menu-icon' :class="activeIcon" type="md-menu"
                      size="36"></Icon>
                <Breadcrumb class="cur-menu-path" @click.native="breadcrumbClick">
                    <BreadcrumbItem v-for="(item,index) in breadcrumbItems" :key="index" :to="item.url">
                        <Icon :type="item.icon" style="margin-right:6px;"/>
                        {{item.name}}
                    </BreadcrumbItem>
                </Breadcrumb>
                <Dropdown class="cur-custom-content">
                    <Avatar class="user-avatar-dropdown" src="https://i.loli.net/2017/08/21/599a521472424.jpg"/>
                    <Icon type="ios-arrow-down user-avatar-dropdown"></Icon>
                    <DropdownMenu slot="list">
                        <DropdownItem>个人信息</DropdownItem>
                        <DropdownItem>注销</DropdownItem>
                    </DropdownMenu>
                </Dropdown>
            </Header>
            <Content :style="{padding: '16px'}">
                <Card>
                    <router-view></router-view>
                </Card>
            </Content>
        </Layout>

    </div>

</template>

<script>
    export default {
        name: 'App',
        components: {},
        data() {
            return {
                theme: 'dark',
                isCollapsed: false,
                collapsedWidth: 78,//收缩时的宽度
                showWidth: 240,//展开时的宽度
                breadcrumbItems: [{name: '首页', url: '/', icon: 'md-home'}],//头部导航面包屑
                menuItems: [{//左侧导航列表
                    name: '内容管理',
                    icon: 'ios-paper',
                    subItem: [{
                        name: '文章管理',
                        icon: 'ios-book',
                        url:'/content/article'
                    }, {
                        name: '作品管理',
                        icon: 'logo-windows',
                        url:'/content/works'
                    }]
                }, {
                    name: '模块管理',
                    icon: 'ios-apps',
                    subItem: [{
                        name: '首页',
                        icon: 'ios-home',
                        url:'/module/home'
                    }, {
                        name: '文章',
                        icon: 'md-book',
                        url:'/module/article'
                    }, {
                        name: '作品',
                        icon: 'ios-browsers',
                        url:'/module/works'
                    }, {
                        name: '联系我',
                        icon: 'md-chatboxes',
                        url:'/module/contact'
                    }]
                }, {
                    name: '统计分析',
                    icon: 'ios-stats',
                    subItem: [{
                        name: '访问分析',
                        icon: 'ios-link',
                    }, {
                        name: '活跃分析',
                        icon: 'ios-happy-outline',
                    }, {
                        name: '时段分析',
                        icon: 'ios-alarm-outline',
                    }, {
                        name: '文章分析',
                        icon: 'ios-book-outline',
                    }, {
                        name: '作品分析',
                        icon: 'ios-browsers-outline',
                    }]
                }, {
                    name: '用户管理',
                    icon: 'ios-people',
                    subItem: [{
                        name: '用户列表',
                        icon: 'md-person',
                    }, {
                        name: '权限管理',
                        icon: 'md-settings',
                    }]
                }, {
                    name: '站内私信',
                    icon: 'md-notifications',
                    subItem: [{
                        name: '消息列表',
                        icon: 'ios-mail',
                    },]
                },{
                    name: '系统管理',
                    icon: 'md-ionitron',
                    subItem: [{
                        name: '模块查询',
                        icon: 'ios-locate-outline',
                    },{
                        name: '错误日志',
                        icon: 'ios-list-box-outline',
                    }]
                }]
            }
        },
        mounted() {

        },
        computed: {
            activeIcon() {
                return this.isCollapsed ? 'active-icon' : ''
            },
            menuitemClasses() {
                return [
                    'menu-item',
                    this.isCollapsed ? 'collapsed-menu' : ''
                ]
            },
            menuitemStyle() {
                return {
                    'padding': this.isCollapsed ? '12px 20px' : '',
                    'textAlign': this.isCollapsed ? 'center' : 'left'
                }
            }
        },
        methods: {
            collapsedSider() {//控制左侧导航栏横向的展开与收缩
                this.$refs.menuSide.toggleCollapse();
            },
            menuSelect(name) {
                var menuItems = name.split('~');
                var menuName = menuItems[0].split('/')[0];
                var menuIcon = menuItems[0].split('/')[1];
                var subMenuName = menuItems[1].split('/')[0];
                var subMenuIcon = menuItems[1].split('/')[1];
                var item = menuName + '-' + subMenuName;
                this.breadcrumbItems = this.breadcrumbItems.slice(0, 1);
                this.breadcrumbItems.push({
                    name: menuName,
                    icon: menuIcon
                });
                this.breadcrumbItems.push({
                    name: subMenuName,
                    icon: subMenuIcon
                });
            },
            breadcrumbClick(ev){//点击首页时
                var target = ev.target || ev.srcElement;
                if(target.innerText.indexOf('首页') !== -1){
                    this.breadcrumbItems = this.breadcrumbItems.slice(0, 1);
                }

            },
            adminTitleClick(ev){
                var target = ev.target || ev.srcElement;
                this.$router.push({
                    name:'AdminHome'
                });
                this.breadcrumbItems = this.breadcrumbItems.slice(0, 1);
            }

        }
    }
</script>

<style scoped>
    #app {
        font-family: 'Avenir', Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
    }

    .container {
        border: 1px solid #d7dde4;
        background: #f5f7f9;
        position: relative;
        border-radius: 4px;
        overflow-x: hidden;
    }

    /*导航展开图标样式*/
    .admin-title{
        text-align: center;
    }
    .admin-title span {
        display: inline-block;
        cursor: pointer;
        font-size: 30px;
        font-weight: 800;
        letter-spacing: 1px;
        color: #088AF0;
        text-align: center;
        margin: 20px auto 10px;
    }

    .admin-title img {
        cursor: pointer;
        width: 100%;
        padding: 0 10px;
    }

    .menu-item span {
        display: inline-block;
        overflow: hidden;
        width: 69px;
        text-overflow: ellipsis;
        white-space: nowrap;
        vertical-align: bottom;
        transition: width .2s ease .2s;
    }

    .menu-item i {
        transform: translateX(0px);
        transition: font-size .2s ease, transform .2s ease;
        vertical-align: middle;
        font-size: 16px;
    }

    /*导航收缩图标样式*/
    .menu-side-scoller::-webkit-scrollbar { /*隐藏滚轮*/
        display: none;
    }

    .collapsed-menu span {
        width: 0px;
        transition: width .2s ease;
    }

    .collapsed-menu i {
        transform: translateX(5px);
        transition: font-size .2s ease .2s, transform .2s ease .2s;
        vertical-align: middle;
        font-size: 22px;
        margin: 0 auto;
    }

    /*右边内容样式--头部*/
    .layout-header-bar {
        background: #fff;
        box-shadow: 0 1px 1px rgba(0, 0, 0, .1);
    }

    .menu-icon {
        transition: all .3s;
    }

    .menu-icon:hover {
        color: #2d8cf0;
    }

    .active-icon {
        transform: rotate(90deg);
    }

    .cur-menu-path {
        margin-left: 20px;
        display: inline-block;
    }

    .cur-custom-content {
        float: right;
        display: inline-block;
        font-size: 0;
        -webkit-text-size-adjust: none;
        cursor: pointer;
    }

    .user-avatar-dropdown {
        display: inline-block;
        font-size: 16px;
        margin-left: 8px;
    }
</style>
