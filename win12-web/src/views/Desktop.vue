<template>
  <div class="desktop" :class="{ dark: isDarkMode }">
    <!-- 登录背景 -->
    <div id="loginback">
      <div class="user"></div>
      <div class="name">{{ user.name }}</div>
      <div id="login" @click="login">
        登录
      </div>
      <div id="login-welc" style="opacity: 0;">
        <loading>
          <svg width="50px" height="50px" viewBox="0 0 16 16">
            <circle cx="8px" cy="8px" r="6px"></circle>
          </svg>
        </loading>
        <p style="font-size: 22px; color: #fff; margin-top: 5px; text-align: center;">欢迎</p>
      </div>
      <list class="langselect new">
        <span class="text" style="font-size: 22px;"><i class="bi bi-globe2"></i></span>
        <a class="a def" @click="setLanguage('default')">Default language of the browser</a>
        <a class="a zh-CN" @click="setLanguage('zh-CN')">简体中文</a>
        <a class="a zh-TW" @click="setLanguage('zh-TW')">繁體中文</a>
        <a class="a en" @click="setLanguage('en')">English</a>
      </list>
      <a class="power" @click="togglePowerMenu">
        <i class="bi bi-power" @click.stop="shutdown" title="关机"></i>
        <i class="bi bi-arrow-counterclockwise" @click.stop="reboot" title="重启"></i>
      </a>
    </div>

    <!-- 开始菜单 -->
    <div id="start-menu" :class="{ show: showStartMenu, max: isStartMenuMax }">
      <div id="startmenu-l">
        <div id="startmenu-user">
          <svg viewBox="0,0,257,344" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" overflow="hidden"><defs><clipPath id="user-clip0"><rect x="382" y="195" width="257" height="344" /></clipPath><linearGradient x1="351.462" y1="233.56" x2="669.496" y2="500.422" gradientUnits="userSpaceOnUse" spreadMethod="reflect" id="user-fill1"><stop offset="0" stop-color="#A964C8" /><stop offset="0.35" stop-color="#A964C8" /><stop offset="0.87" stop-color="#2D8AD5" /><stop offset="1" stop-color="#2D8AD5" /></linearGradient><linearGradient x1="351.462" y1="233.56" x2="669.496" y2="500.422" gradientUnits="userSpaceOnUse" spreadMethod="reflect" id="user-fill2"><stop offset="0" stop-color="#A964C8" /><stop offset="0.35" stop-color="#A964C8" /><stop offset="0.87" stop-color="#2D8AD5" /><stop offset="1" stop-color="#2D8AD5" /></linearGradient></defs><g clip-path="url(#user-clip0)" transform="translate(-382 -195)"><path d="M637.755 433.872C642.215 515.221 579.577 537.983 508.011 537.983 436.444 537.983 376.676 507.833 383.513 437.11 383.109 425.234 389.59 414.133 398.634 409.891 413.82 402.768 444.753 402.936 507.484 402.997 570.214 403.058 609.164 402.279 621.521 407.947 633.878 413.614 638.011 424.609 637.755 433.872Z" fill="url(#user-fill1)" fill-rule="evenodd" /><path d="M422 285C422 235.847 461.623 196 510.5 196 559.377 196 599 235.847 599 285 599 334.153 559.377 374 510.5 374 461.623 374 422 334.153 422 285Z" fill="url(#user-fill2)" fill-rule="evenodd" /></g></svg>
        </div>
        <p style="width: 100%;text-align: center;margin: -50px 0 20px 0;font-size: 30px;">{{ user.name }}</p>
        <input type="text" class="input" placeholder="在这里输入你要搜索的内容" @focus="showSearch">
        <input-before class="bi bi-search"></input-before>
        <list>
          <p class="text">可用</p>
          <a @click="openApp('setting')">
            <img src="/icon/setting.svg">
            <p>设置</p>
          </a>
          <a @click="openApp('explorer')">
            <img src="/icon/explorer.svg">
            <p>文件资源管理器</p>
          </a>
          <a @click="openApp('calc')">
            <img src="/icon/calc.svg">
            <p>计算器</p>
          </a>
          <a @click="openApp('run')">
            <img src="/icon/run.svg">
            <p>运行</p>
          </a>
          <a @click="openApp('about')">
            <img src="/icon/about.svg">
            <p>关于 Win12 网页版</p>
          </a>
          <a @click="openApp('taskmgr')">
            <img src="/icon/taskmgr.png">
            <p>任务管理器</p>
          </a>
          <a @click="openApp('notepad')">
            <img src="/icon/notepad.svg">
            <p>记事本</p>
          </a>
          <a @click="openApp('copilot')">
            <img src="/icon/copilot.svg">
            <p>AI Chat</p>
          </a>
          <a @click="openApp('edge')">
            <img src="/icon/edge.svg">
            <p>Microsoft Edge</p>
          </a>
          <a @click="openApp('msstore')">
            <img src="/icon/msstore.svg">
            <p>Microsoft Store</p>
          </a>
          <a @click="openApp('camera')">
            <img src="/icon/camera.svg">
            <p>相机</p>
          </a>
          <a @click="openApp('pythonEditor')">
            <img src="/icon/pythonEditor.svg">
            <p>Python Editor</p>
          </a>
          <a @click="openApp('python')">
            <img src="/icon/python.svg">
            <p>Python 3.10.2</p>
          </a>
          <a @click="openApp('terminal')">
            <img src="/icon/terminal.svg">
            <p>终端</p>
          </a>
          <a @click="openApp('whiteboard')">
            <img src="/icon/whiteboard.svg">
            <p>Whiteboard</p>
          </a>
          <a @click="openApp('defender')">
            <img src="/icon/defender.svg">
            <p>Windows 安全中心</p>
          </a>
          <a @click="openApp('word')">
            <img src="/icon/word.svg">
            <p>Word Preview</p>
          </a>
          <p class="text">Web 应用</p>
          <a @click="openApp('minesweeper')">
            <img src="/icon/minesweeper.svg">
            <p>扫雷</p>
          </a>
          <a @click="openApp('bilibili')">
            <img src="/icon/bilibili.png">
            <p>哔哩哔哩</p>
          </a>
          <a @click="openApp('vscode')">
            <img src="/icon/vscode.png">
            <p>Visual Studio Code</p>
          </a>
          <a @click="openApp('wsa')">
            <img src="/icon/wsa.png">
            <p>适用于 Android™ 的 Windows 子系统</p>
          </a>
          <a @click="openApp('windows12')">
            <img src="/icon/logo.svg">
            <p>Windows 12</p>
          </a>
        </list>
      </div>
      <div id="startmenu-r">
        <div class="row1">
          <div class="folder">
            <a class="a sm-app enable" @click="openApp('explorer')">
              <img src="/icon/folder/docs.svg">
              <p>文档</p>
            </a>
            <a class="a sm-app enable" @click="openApp('explorer')">
              <img src="/icon/folder/pics.svg">
              <p>图片</p>
            </a>
            <a class="a sm-app enable" @click="openApp('explorer')">
              <img src="/icon/folder/music.svg">
              <p>音乐</p>
            </a>
          </div>
          <div class="tool">
            <p style="font-size: 30px;margin: 12px 5px 2px 0;line-height:1;" class="time">{{ currentTime }}</p>
            <p class="date" style="opacity: 0.5;">{{ currentDate }}</p>
            <div class="pw">
              <a class="a btn btn-icon big" @click="toggleStartMenuMax">
                <i :class="isStartMenuMax ? 'bi bi-arrows-angle-contract' : 'bi bi-arrows-angle-expand'"></i>
              </a>
              <a class="a btn btn-icon power" @click="togglePowerMenu">
                <span class="bi bi-power"></span>
                <i class="bi bi-power" @click.stop="shutdown" title="关机"></i>
                <i class="bi bi-arrow-counterclockwise" @click.stop="reboot" title="重启"></i>
              </a>
            </div>
          </div>
        </div>
        <div class="pinned">
          <div class="title">
            <p>已固定</p>
            <div>
              <a class="a more-btn"><span>所有应用</span> <i class="bi bi-chevron-right"></i></a>
            </div>
          </div>
          <div class="apps">
            <a class="a sm-app enable calc" @click="openApp('calc')">
              <img src="/icon/calc.svg">
              <p>计算器</p>
            </a>
            <a class="a sm-app enable camera" @click="openApp('camera')">
              <img src="/icon/camera.svg">
              <p>相机</p>
            </a>
            <a class="a sm-app enable about" @click="openApp('about')">
              <img src="/icon/about.svg">
              <p>关于 Win12 网页版</p>
            </a>
            <a class="a sm-app enable explorer" @click="openApp('explorer')">
              <img src="/icon/explorer.svg">
              <p>文件资源管理器</p>
            </a>
            <a class="a sm-app enable notepad" @click="openApp('notepad')">
              <img src="/icon/notepad.svg">
              <p>记事本</p>
            </a>
            <a class="a sm-app enable setting" @click="openApp('setting')">
              <img src="/icon/setting.svg">
              <p>设置 </p>
            </a>
            <a class="a sm-app enable defender" @click="openApp('defender')">
              <img src="/icon/defender.svg">
              <p>Windows 安全中心</p>
            </a>
            <a class="a sm-app enable msstore" @click="openApp('msstore')">
              <img src="/icon/msstore.svg">
              <p>Microsoft Store</p>
            </a>
            <a class="a sm-app enable edge" @click="openApp('edge')">
              <img src="/icon/edge.svg">
              <p>Microsoft Edge</p>
            </a>
            <a class="a sm-app enable windows12" @click="openApp('windows12')">
              <img src="/icon/logo.svg">
              <p>Windows 12</p>
            </a>
            <a class="a sm-app enable terminal" @click="openApp('terminal')">
              <img src="/icon/terminal.svg">
              <p>终端</p>
            </a>
          </div>
        </div>
        <div class="tuijian">
          <div class="title">
            <p>推荐的项目</p>
            <div>
              <a class="a more-btn" @click="openApp('explorer')"><span>更多</span> <i class="bi bi-chevron-right"></i></a>
            </div>
          </div>
          <div class="apps">
            <a class="a tj-obj act"><img src="/icon/files/ppt.png"><div><p>科学地使用瓶盖.pptx</p><p>5 分钟前</p></div></a>
            <a class="a tj-obj act"><img src="/icon/files/img.png"><div><p>可口可乐瓶盖.jpg</p><p>7 分钟前</p></div></a>
            <a class="a tj-obj act"><img src="/icon/files/img.png"><div><p>瓶盖构造图.jpg</p><p>16 分钟前</p></div></a>
            <a class="a tj-obj act" @click="openApp('word')"><img src="/icon/files/word.png"><div><p>瓶盖的构造及作用.docx</p><p>24 分钟前</p></div></a>
            <a class="a tj-obj act"><img src="/icon/files/excel.png"><div><p>可口可乐瓶盖厚度.xlsx</p><p>35 分钟前</p></div></a>
          </div>
        </div>
      </div>
    </div>

    <!-- 搜索框 -->
    <div id="search-win" :class="{ show: showSearch, 'show-begin': showSearchBegin }">
      <input type="text" class="input" placeholder="在这里输入你要搜索的内容" id="search-input">
      <input-before class="bi bi-search"></input-before>
      <div class="tab">
        <a class="now">全部</a><a>应用</a><a>文档</a><a>网页</a>
        <a>设置</a>
        <a>文件夹</a><a>照片</a>
      </div>
      <div class="ans">
        <div class="list">
          <list>
            <p class="text">推荐</p>
            <a @click="openApp('setting'); hideSearch()">
              <img src="/icon/setting.svg">
              <p>设置</p>
            </a>
            <a @click="openApp('about'); hideSearch()">
              <img src="/icon/about.svg">
              <p>关于 Win12 网页版</p>
            </a>
          </list>
        </div>
        <div class="view">
          <div class="fname">
            <i class="bi bi-search"></i>
            <p class="name"></p>
            <p class="type"></p>
          </div>
          <hr>
          <div class="option">
            <list>
              <a class="a">打开</a>
              <a class="a">打开文件所在位置</a>
              <a class="a">复制路径</a>
            </list>
          </div>
        </div>
      </div>
    </div>

    <!-- 小组件 -->
    <div id="widgets" :class="{ show: showWidgets }">
      <div class="widgets">
        <div class="bar">
          <p class="tit">小组件</p>
          <button class="a act btn btn-icon big" style="background: linear-gradient(100deg, var(--theme-1), var(--theme-2));color:#fff;">
            <i class="bi bi-plus-lg"></i>
          </button>
        </div>
        <div class="content">
          <div class="template">
            <!-- 小组件模板 -->
          </div>
          <div class="grid">
            <!-- 小组件内容 -->
          </div>
        </div>
      </div>
      <span class="hr"></span>
      <div class="news">
        <div class="bar">
          <p class="tit">新闻</p>
          <div>
            <span style="color: #7f7f7f;margin-right: 5px;margin-top: 2px;">我们不对新闻内容负责</span>
            <button class="a act btn btn-icon big" style="background: linear-gradient(100deg, var(--theme-1), var(--theme-2));color:#fff;">
              <i class="bi bi-arrow-repeat"></i>
            </button>
          </div>
        </div>
        <div class="full-tip">
          <loading>
            <svg width="30px" height="30px" viewBox="0 0 16 16">
              <circle cx="8px" cy="8px" r="7px" style="stroke:#7f7f7f50;fill:none;stroke-width:3px;"></circle>
              <circle cx="8px" cy="8px" r="7px" style="stroke:#2983cc;stroke-width:3px;"></circle>
            </svg>
          </loading>
          <p class="tit"></p>
          <p class="desc"></p>
          <p class="info"></p>
        </div>
        <div class="content">
          <div class="card top-news"></div>
          <div class="news-all"></div>
        </div>
      </div>
    </div>

    <!-- 任务栏 -->
    <div id="dock-box">
      <div class="dock dock-start">
        <a class="dock-btn" id="start-btn" @click="toggleStartMenu">
          <svg class="menu" viewBox="0,0,440,439" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" overflow="hidden">
            <defs>
              <clipPath id="clip-start1">
                <rect x="134" y="59" width="440" height="439" />
              </clipPath>
            </defs>
            <g clip-path="url(#clip-start1)" transform="translate(-134 -59)">
              <path d="M233.479 67.5001 475.521 67.5001C525.767 67.5001 566.5 108.233 566.5 158.479L566.5 490.5 142.5 490.5 142.5 158.479C142.5 108.233 183.233 67.5001 233.479 67.5001Z" stroke="#7F7F7F" stroke-width="14.6667" stroke-linecap="round" stroke-miterlimit="8" fill="#A6A6A6" fill-rule="evenodd" style="fill: var(--bg70);" />
              <path d="M208.5 132.5 334.716 132.5" stroke="#888" stroke-width="14.6667" stroke-linecap="round" stroke-miterlimit="8" fill="none" fill-rule="evenodd" />
              <path d="M208.5 175.5 386.34 175.5" stroke="#888" stroke-width="14.6667" stroke-linecap="round" stroke-miterlimit="8" fill="none" fill-rule="evenodd" />
              <path d="M208.5 221.5 271.608 221.5" stroke="#888" stroke-width="14.6667" stroke-linecap="round" stroke-miterlimit="8" fill="none" fill-rule="evenodd" />
            </g>
          </svg>
          <img src="/icon/logo.svg" class="ico">
        </a>
        <a class="dock-btn" id="search-btn" @click="toggleSearch">
          <svg class="out" width="26" height="26" viewBox="0,0,228,229" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" overflow="hidden"><defs><clipPath id="clip-search-out-0"><rect x="548" y="268" width="228" height="229"/></clipPath><linearGradient x1="738.799" y1="300.076" x2="608.064" y2="486.786" gradientUnits="userSpaceOnUse" spreadMethod="reflect" id="fill-search-out-1"><stop offset="0" stop-color="#A6A6A6"/><stop offset="0.18" stop-color="#A6A6A6"/><stop offset="0.91" stop-color="#595959"/><stop offset="1" stop-color="#595959"/></linearGradient></defs><g clip-path="url(#clip-search-out-0)" transform="translate(-548 -268)"><path d="M640 268.696C690.41 268.696 731.276 309.574 731.276 360 731.276 378.91 725.529 396.477 715.687 411.049L713.816 413.318 771.4 470.903C777.068 476.571 777.068 485.761 771.4 491.429 765.732 497.097 756.542 497.097 750.874 491.429L693.292 433.847 691.033 435.711C676.465 445.556 658.904 451.305 640 451.304 589.59 451.305 548.724 410.426 548.724 360 548.724 309.574 589.59 268.696 640 268.696Z" fill="url(#fill-search-out-1)" fill-rule="evenodd"/></g></svg>
          <svg class="in" width="20" height="20" viewBox="0,0,134,134" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" overflow="hidden"><defs><clipPath id="clip-search-in-0"><rect x="573" y="293" width="134" height="134"/></clipPath><linearGradient x1="611.068" y1="280.509" x2="668.932" y2="439.491" gradientUnits="userSpaceOnUse" spreadMethod="reflect" id="fill-search-in-1"><stop offset="0" stop-color="#82CDF6"/><stop offset="0.18" stop-color="#82CDF6"/><stop offset="0.91" stop-color="#4297D6"/><stop offset="1" stop-color="#4297D6"/></linearGradient><image width="132" height="132" xlink:href="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAIQAAACECAMAAABmmnOVAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAFZUExURQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAKhZnwEAAABzdFJOUwABAgMEBQYHCAkKCwwNDg8QERITFBUWFxgZGhscHR4fICEiIyQlJicoKSorLC0uLzAxMjM0NTY3ODk6Ozw9Pj9AQUJDREVGR0hJSktMTU5PUFFSU1RVVldYWVpbXF1eX2BhYmNkZWZnaGlqa2xtbm9wcXJv0gLZAAAACXBIWXMAAA7DAAAOwwHHb6hkAAARAklEQVR4XsWb91caWRTH2TQbFjoMvUlHmoKggihiw94Su8ZojInZ/P8/7Pfe9wZI1wjZ7zm7x8AM8zm3vpl5V/OHGvSMlde3tk5OLm9vzw8P19ZWpuMurfzyL2gotvjm5u7D+5vr63dXV28vLy+ELi/fnm6VRwflYd3TQKh2/unu9j0uf3lxfnZ6cnJ8fHR0yDo6Oj4+OT0735vy98vDu6CRscYtCG6uAXB2enx0+PrgYH9/b3d3h7S7u7u3v3/w+vDo+OTNbLgrBnkVnD+/B8G7txdnJ8e4/t7u9tbmxsb6+lpDaG1tfX1jc2sbLAdvjjYn3S/lqZ3Si+zV548f3l8TwdGbg72drY31xurK8tLiYr2+sLBQq+F/9fri0vLKagMo27v7rw83o8/l6Z2QPn94//HDzbvL85Oj1/u725vrjZWl+kJtvlqdrZTL5RlWuVyZna3O1xbqS8uraxtbO3sHy4kR+RNPVV/pw/3H25ury7Pjw4Pd7Y211eXFhflqpTwzVSoWJwuFPDSRzxcKk8ViaWqmXKnO1epLK431rZ397Uyf/JmnqDd3+vnj7fXVxSmMsLO5trpUr83NlZxdXV1Xl5eUlJSfn58eHh4eHBwfHx8fHx0dHQ09PT39/fv7+/j4+Pv7+9fX19fX18fHx4eHB8fHx8fHx4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh