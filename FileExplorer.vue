<template>
  <div class="window explorer" :class="{ foc: isFocused }">
    <div class="titbar">
      <img src="./icon/explorer.svg" class="icon">
      <p>文件资源管理器</p>
      <div>
        <a class="a wbtg red" @click="close"><i class="bi bi-x-lg"></i></a>
        <a class="a wbtg max" @click="toggleMaximize"><i class="bi bi-app"></i></a>
        <a class="a wbtg" @click="toggleMinimize"><i class="bi bi-dash-lg"></i></a>
      </div>
    </div>
    <div class="loadback" v-if="loading">
      <img src="./icon/explorer.svg" class="icon">
    </div>
    <div class="content" id="win-explorer" v-else>
      <div class="path">
        <a class="a btn btn-icon back" :class="{ disabled: !canGoBack }" @click="goBack">
          <i class="bi bi-arrow-left"></i>
        </a>
        <a class="a btn btn-icon front" :class="{ disabled: !canGoForward }" @click="goForward">
          <i class="bi bi-arrow-right"></i>
        </a>
        <a class="a btn btn-icon goback" @click="goUp">
          <i class="bi bi-arrow-up"></i>
        </a>
        <p class="tit">
          <img class="icon" :src="currentIcon">
          <div class="path">
            <span v-for="(part, index) in pathParts" :key="index">
              <span class="text" @click="goToPath(part.path)">{{ part.name }}</span>
              <span v-if="index < pathParts.length - 1" class="arrow">›</span>
            </span>
          </div>
        </p>
        <div class="search">
          <input type="text" class="input" placeholder="在这里输入你要搜索的内容" v-model="searchQuery">
        </div>
      </div>
      <div class="page">
        <div class="menu">
          <div class="card pinned">
            <p class="title"><span style="font: 15px;">📌</span> 已固定</p>
            <list>
              <a @click="showNoPermission">
                <img src="./apps/icons/explorer/qa.png">
                <span>快速访问</span>
              </a>
              <a @click="showNoPermission">
                <img src="./apps/icons/explorer/od.png">
                OneDrive
              </a>
              <a :class="{ check: currentLocation === 'thispc' }" @click="reset">
                <span style="background:linear-gradient(180deg, var(--theme-1, #0078d4), var(--theme-2, #00bcf2));width:4px;height: 19px;border-radius: 10px;margin-left: -12px;margin-right: 8px;margin-top: 1px;"></span>
                <img src="./apps/icons/explorer/thispc.svg">
                <span>此电脑</span>
              </a>
              <a @click="showNoPermission">
                <img src="./apps/icons/explorer/rb.png">
                <span>回收站</span>
              </a>
            </list>
          </div>
          <div class="card tags">
            <p class="title"><span style="font: 15px;">🏷</span> 标签</p>
            <list>
              <a @click="showNoPermission"><span style="background-color: red;"></span><span>红色</span></a>
              <a @click="showNoPermission"><span style="background-color: #3981d9;"></span><span>蓝色</span></a>
              <a @click="showNoPermission"><span style="background-color: yellow;"></span><span>黄色</span></a>
              <a @click="showNoPermission"><span style="background-color: green;"></span><span>绿色</span></a>
              <a @click="showNoPermission"><span style="background-color: #fc9816;"></span><span>橙色</span></a>
              <a @click="showNoPermission"><span style="background-color: purple;"></span><span>紫色</span></a>
              <a @click="showNoPermission"><span style="background-color: #ffcad4;"></span><span>粉色</span></a>
            </list>
          </div>
        </div>
        <div class="main">
          <div class="tool micaalt">
            <a class="a b t act" @click="createNewFile">
              <img src="./apps/icons/explorer/tool-new.png">
              <span>新建</span>
            </a>
            <div class="hr"></div>
            <a class="a b act" @click="cut">
              <img src="./apps/icons/explorer/tool-cut.png">
            </a>
            <a class="a b act" @click="copy">
              <img src="./apps/icons/explorer/tool-copy.png">
            </a>
            <a class="a b act" @click="paste">
              <img src="./apps/icons/explorer/tool-paste.png">
            </a>
            <a class="a b act" @click="renameSelected">
              <img src="./apps/icons/explorer/tool-rename.png">
            </a>
            <div class="hr"></div>
            <a class="a b t act">
              <img src="./apps/icons/explorer/tool-sort.png">
              <span>排序方式</span>
            </a>
            <a class="a b t act">
              <img src="./apps/icons/explorer/tool-view.png">
              <span>布局</span>
            </a>
          </div>
          <div class="content" @click="deselectAll" @contextmenu.prevent="showContextMenu">
            <div class="view">
              <div v-if="filteredItems.length === 0" class="info">此文件夹为空</div>
              <div
                v-for="item in filteredItems"
                :key="item.path"
                class="item"
                :class="{
                  [item.type]: true,
                  select: selectedItems.includes(item.path)
                }"
                @click.stop="selectItem(item, $event)"
                @dblclick="openItem(item)"
                @contextmenu.prevent="showItemContextMenu(item, $event)"
              >
                <img :src="getItemIcon(item)">
                <span v-if="!item.isEditing">{{ item.name }}</span>
                <input
                  v-else
                  v-model="item.tempName"
                  @blur="finishRename(item)"
                  @keyup.enter="finishRename(item)"
                  @keyup.escape="cancelRename(item)"
                  ref="renameInput"
                  class="input"
                  autofocus
                >
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'FileExplorer',
  props: {
    modelValue: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      isFocused: true,
      loading: false,
      isMaximized: false,
      isMinimized: false,
      searchQuery: '',
      currentPath: 'C:/用户/Administrator',
      currentLocation: 'thispc',
      history: ['C:/用户/Administrator'],
      historyIndex: 0,
      clipboard: null,
      clipboardAction: null,
      selectedItems: [],
      fileSystem: {
        'C:/': {
          name: 'C:',
          type: 'drive',
          path: 'C:/',
          folder: {
            '用户': {
              name: '用户',
              type: 'folder',
              path: 'C:/用户',
              folder: {
                'Administrator': {
                  name: 'Administrator',
                  type: 'folder',
                  path: 'C:/用户/Administrator',
                  folder: {
                    '文档': {
                      name: '文档',
                      type: 'folder',
                      path: 'C:/用户/Administrator/文档',
                      folder: {},
                      file: [
                        { name: '工作记录.txt', type: 'file', path: 'C:/用户/Administrator/文档/工作记录.txt' },
                        { name: '项目计划.docx', type: 'file', path: 'C:/用户/Administrator/文档/项目计划.docx' }
                      ]
                    },
                    '图片': {
                      name: '图片',
                      type: 'folder',
                      path: 'C:/用户/Administrator/图片',
                      folder: {},
                      file: [
                        { name: '风景.jpg', type: 'file', path: 'C:/用户/Administrator/图片/风景.jpg' },
                        { name: '截图.png', type: 'file', path: 'C:/用户/Administrator/图片/截图.png' }
                      ]
                    },
                    '音乐': {
                      name: '音乐',
                      type: 'folder',
                      path: 'C:/用户/Administrator/音乐',
                      folder: {},
                      file: [
                        { name: '歌曲.mp3', type: 'file', path: 'C:/用户/Administrator/音乐/歌曲.mp3' }
                      ]
                    },
                    '视频': {
                      name: '视频',
                      type: 'folder',
                      path: 'C:/用户/Administrator/视频',
                      folder: {},
                      file: []
                    },
                    '下载': {
                      name: '下载',
                      type: 'folder',
                      path: 'C:/用户/Administrator/下载',
                      folder: {},
                      file: []
                    }
                  },
                  file: [
                    { name: 'readme.txt', type: 'file', path: 'C:/用户/Administrator/readme.txt' }
                  ]
                }
              },
              file: []
            }
          },
          file: []
        },
        'D:/': {
          name: 'D:',
          type: 'drive',
          path: 'D:/',
          folder: {
            '项目': {
              name: '项目',
              type: 'folder',
              path: 'D:/项目',
              folder: {},
              file: []
            }
          },
          file: []
        }
      }
    };
  },
  computed: {
    canGoBack() {
      return this.historyIndex > 0;
    },
    canGoForward() {
      return this.historyIndex < this.history.length - 1;
    },
    pathParts() {
      const parts = this.currentPath.split('/').filter(p => p);
      let fullPath = '';
      return parts.map(part => {
        fullPath += (fullPath ? '/' : '') + part;
        return { name: part, path: fullPath + (fullPath.length === 2 ? '/' : '') };
      });
    },
    currentIcon() {
      return './apps/icons/explorer/folder.svg';
    },
    currentItems() {
      const items = [];
      const folder = this.getFolderByPath(this.currentPath);
      
      if (folder) {
        if (folder.folder) {
          Object.keys(folder.folder).forEach(key => {
            items.push(folder.folder[key]);
          });
        }
        if (folder.file) {
          folder.file.forEach(file => {
            items.push(file);
          });
        }
      }
      
      if (this.currentPath === 'C:/用户/Administrator') {
        items.unshift(
          { name: '文档', type: 'folder', path: 'C:/用户/Administrator/文档' },
          { name: '图片', type: 'folder', path: 'C:/用户/Administrator/图片' },
          { name: '音乐', type: 'folder', path: 'C:/用户/Administrator/音乐' },
          { name: '视频', type: 'folder', path: 'C:/用户/Administrator/视频' },
          { name: '下载', type: 'folder', path: 'C:/用户/Administrator/下载' }
        );
      }
      
      if (this.currentLocation === 'thispc') {
        items.unshift(
          { name: 'C:', type: 'drive', path: 'C:/' },
          { name: 'D:', type: 'drive', path: 'D:/' }
        );
      }
      
      return items;
    },
    filteredItems() {
      if (!this.searchQuery) {
        return this.currentItems;
      }
      return this.currentItems.filter(item => 
        item.name.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
    }
  },
  methods: {
    close() {
      this.$emit('update:modelValue', false);
    },
    toggleMaximize() {
      this.isMaximized = !this.isMaximized;
    },
    toggleMinimize() {
      this.isMinimized = !this.isMinimized;
    },
    getFolderByPath(path) {
      if (path === 'thispc') return null;
      
      let current = this.fileSystem;
      const parts = path.split('/').filter(p => p);
      
      for (const part of parts) {
        if (current[part + '/']) {
          current = current[part + '/'];
        } else if (current.folder && current.folder[part]) {
          current = current.folder[part];
        } else {
          return null;
        }
      }
      
      return current;
    },
    goBack() {
      if (this.canGoBack) {
        this.historyIndex--;
        this.currentPath = this.history[this.historyIndex];
      }
    },
    goForward() {
      if (this.canGoForward) {
        this.historyIndex++;
        this.currentPath = this.history[this.historyIndex];
      }
    },
    goUp() {
      const parts = this.currentPath.split('/').filter(p => p);
      if (parts.length > 0) {
        parts.pop();
        const newPath = parts.join('/') + (parts.length === 1 ? '/' : '');
        this.navigateTo(newPath);
      }
    },
    goToPath(path) {
      this.navigateTo(path);
    },
    navigateTo(path) {
      this.currentPath = path;
      this.currentLocation = path === 'thispc' ? 'thispc' : 'folder';
      
      if (this.historyIndex < this.history.length - 1) {
        this.history = this.history.slice(0, this.historyIndex + 1);
      }
      this.history.push(path);
      this.historyIndex = this.history.length - 1;
      
      this.selectedItems = [];
    },
    reset() {
      this.currentPath = 'C:/用户/Administrator';
      this.currentLocation = 'thispc';
      this.history = ['C:/用户/Administrator'];
      this.historyIndex = 0;
      this.selectedItems = [];
    },
    selectItem(item, event) {
      if (event.ctrlKey) {
        const index = this.selectedItems.indexOf(item.path);
        if (index > -1) {
          this.selectedItems.splice(index, 1);
        } else {
          this.selectedItems.push(item.path);
        }
      } else {
        this.selectedItems = [item.path];
      }
    },
    deselectAll() {
      this.selectedItems = [];
    },
    openItem(item) {
      if (item.type === 'folder' || item.type === 'drive') {
        this.navigateTo(item.path);
      } else {
        this.$emit('open-file', item);
      }
    },
    getItemIcon(item) {
      if (item.type === 'drive') {
        return './apps/icons/explorer/diskwin.svg';
      } else if (item.type === 'folder') {
        return './apps/icons/explorer/folder.svg';
      } else {
        const ext = item.name.split('.').pop().toLowerCase();
        const iconMap = {
          txt: './icon/files/txt.png',
          doc: './icon/files/word.png',
          docx: './icon/files/word.png',
          xls: './icon/files/excel.png',
          xlsx: './icon/files/excel.png',
          ppt: './icon/files/ppt.png',
          pptx: './icon/files/ppt.png',
          jpg: './icon/files/img.png',
          jpeg: './icon/files/img.png',
          png: './icon/files/img.png',
          gif: './icon/files/img.png',
          mp3: './icon/files/music.png',
          wav: './icon/files/music.png',
          mp4: './icon/files/vidio.png',
          avi: './icon/files/vidio.png',
          pdf: './icon/files/pdf.svg',
          exe: './icon/files/exefile.png'
        };
        return iconMap[ext] || './icon/files/none.png';
      }
    },
    createNewFile() {
      const folder = this.getFolderByPath(this.currentPath);
      if (folder && folder.file) {
        const newFile = {
          name: '新建文本文档.txt',
          type: 'file',
          path: this.currentPath + '/新建文本文档.txt'
        };
        folder.file.push(newFile);
      }
    },
    cut() {
      if (this.selectedItems.length > 0) {
        this.clipboard = [...this.selectedItems];
        this.clipboardAction = 'cut';
      }
    },
    copy() {
      if (this.selectedItems.length > 0) {
        this.clipboard = [...this.selectedItems];
        this.clipboardAction = 'copy';
      }
    },
    paste() {
      if (this.clipboard && this.clipboard.length > 0) {
        console.log('Pasting items:', this.clipboard, 'Action:', this.clipboardAction);
      }
    },
    renameSelected() {
      if (this.selectedItems.length === 1) {
        const item = this.currentItems.find(i => i.path === this.selectedItems[0]);
        if (item) {
          item.isEditing = true;
          item.tempName = item.name;
          this.$nextTick(() => {
            if (this.$refs.renameInput) {
              this.$refs.renameInput.focus();
              this.$refs.renameInput.select();
            }
          });
        }
      }
    },
    finishRename(item) {
      if (item.tempName && item.tempName.trim()) {
        item.name = item.tempName.trim();
      }
      item.isEditing = false;
      item.tempName = '';
    },
    cancelRename(item) {
      item.isEditing = false;
      item.tempName = '';
    },
    showNoPermission() {
      alert('抱歉，此功能暂未实现');
    },
    showContextMenu(event) {
      console.log('Show context menu for empty area');
    },
    showItemContextMenu(item, event) {
      this.selectedItems = [item.path];
      console.log('Show context menu for item:', item);
    }
  }
};
</script>

<style scoped>
.window.explorer > .titbar > .tabs > .tab > p > img {
  width: 25px;
  height: 25px;
  margin-right: 5px;
}

.window.explorer > .titbar > .tabs > .tab > p {
  display: flex !important;
  align-items: center;
}

#win-explorer {
  display: flex;
  flex-direction: column;
}

#win-explorer > .page {
  display: flex;
  flex-grow: 1;
  overflow: hidden;
}

#win-explorer > .page > .menu {
  min-width: 250px;
  height: 100%;
  overflow-y: auto;
  margin-right: 6px;
  padding-right: 2px;
}

#win-explorer > .page > .menu > .card {
  margin: 10px 0 10px 15px;
  border-radius: 8px;
  background-color: var(--card, #f3f3f3);
  padding: 4px;
  box-shadow: 0 1px 2px 1px var(--s3d, rgba(0,0,0,0.1));
}

#win-explorer > .page > .menu > .card > .title {
  padding: 6px 10px;
  font-weight: 550;
}

#win-explorer > .page > .menu > .card > list > a {
  padding: 4px 5px 4px 20px;
  font-size: 15px;
  border-radius: 7px;
  transition: 100ms;
  display: flex;
  height: 30px;
  align-items: center;
  cursor: pointer;
}

#win-explorer > .page > .menu > .card > list > a.check {
  background-color: var(--hover, #e5e5e5) !important;
}

#win-explorer > .page > .menu > .pinned > list > a > img {
  width: 18px;
  height: 18px;
  margin-right: 5px;
}

#win-explorer > .page > .menu > .tags > list > a > span:first-child {
  width: 13px;
  height: 13px;
  margin-left: 4px;
  margin-right: 7px;
  border-radius: 50%;
  box-shadow: 0 0 5px var(--shadow, rgba(0,0,0,0.2));
}

#win-explorer > .page > .main {
  flex-grow: 1;
  height: 100%;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  padding-left: 2px;
}

#win-explorer > .page > .main > .tool {
  width: 100%;
  height: 42px;
  display: flex;
  padding: 0 10px 5px 10px;
  margin-top: 3px;
  align-items: center;
}

#win-explorer > .page > .main > .tool > .b {
  height: 33px;
  padding: 6px 8px;
  border-radius: 7px;
  transition: 100ms;
  margin: 0 1px;
  cursor: pointer;
}

#win-explorer > .page > .main > .tool > .b.t {
  display: flex;
  align-items: center;
  font-size: 15px;
}

#win-explorer > .page > .main > .tool > .b.t > img {
  display: flex;
  margin-right: 5px;
}

#win-explorer > .page > .main > .tool > .b:hover {
  background-color: var(--hover, #e5e5e5);
}

#win-explorer > .page > .main > .tool > .b > img {
  width: 20px;
  height: 20px;
}

#win-explorer > .page > .main > .tool > .hr {
  width: 2px;
  height: 25px;
  background-color: #7f7f7f7f;
  border-radius: 10px;
  margin: 5px 3px;
}

#win-explorer > .page > .main > .content {
  width: calc(100% - 15px);
  flex-grow: 1;
  background-color: var(--card, #f3f3f3);
  border-radius: 8px;
  margin: 0 15px 10px 0;
  padding: 13px 10px 40px 10px;
  overflow-y: auto;
  box-shadow: 0 1px 2px 1px var(--s3d, rgba(0,0,0,0.1));
}

#win-explorer > .path {
  height: 35px;
  width: 100%;
  display: flex;
  padding: 4px 10px 0 10px;
  align-items: center;
}

#win-explorer > .path > .front.disabled,
#win-explorer > .path > .back.disabled {
  filter: opacity(0.5);
  pointer-events: none;
}

#win-explorer > .path > .btn {
  transition: 100ms;
  font-size: 17px;
  text-align: center;
  padding-top: 4px;
  min-width: 33px;
}

#win-explorer > .path > .tit {
  overflow: hidden;
  display: flex;
  flex-grow: 1;
  margin: 0px 10px 0px 5px;
  border-radius: 7px;
  height: 32px;
}

#win-explorer > .path > .tit > img {
  width: 22px;
  height: 22px;
  margin-top: 2px;
}

#win-explorer > .path > .tit > .path {
  display: flex;
  align-items: center;
  overflow-y: hidden;
  width: calc(100% - 35px);
}

#win-explorer > .path > .tit > .path::-webkit-scrollbar {
  height: 2px;
}

#win-explorer > .path > .tit > .path::-webkit-scrollbar-thumb {
  background: #7f7f7f70;
  background-clip: padding-box;
  border: 0px solid transparent;
  border-radius: 10px;
}

#win-explorer > .path > .tit > .path > * {
  display: block;
  height: 100%;
  white-space: nowrap;
}

#win-explorer > .path > .tit > .path > .arrow {
  opacity: 0.4;
  font-size: 14px;
  line-height: 1;
  height: 14px;
  margin: 0 4px;
}

#win-explorer > .path > .tit > .path > .text {
  padding: 2px 5px;
  height: min-content;
  border-radius: 5px;
  font-size: 15px;
  transition: 50ms;
  cursor: pointer;
}

#win-explorer > .path > .tit > .path > .text:hover {
  background-color: var(--hover, #e5e5e5);
}

#win-explorer > .path > .tit > .path > .text:active {
  opacity: 0.8;
}

#win-explorer > .path > .tit > .icon {
  width: 25.6px;
  margin-top: -1px;
  margin-left: 3px;
  margin-right: 5px;
  background-size: contain;
  background-position: 50% 50%;
  background-repeat: no-repeat;
}

#win-explorer > .path > .search {
  min-width: 170px;
  width: 26%;
  max-width: 400px;
}

#win-explorer > .path > .search > * {
  float: right;
}

#win-explorer > .path > .search > .input {
  white-space: nowrap;
  text-overflow: ellipsis;
}

#win-explorer > .page > .main > .content > .view {
  width: 100%;
  height: max-content;
  display: flex;
  flex-direction: column;
}

#win-explorer > .page > .main > .content > .view > .info {
  color: #888;
  text-align: center;
}

#win-explorer > .page > .main > .content > .view > .item {
  width: 100%;
  padding: 2px 5px;
  border-radius: 5px;
  display: flex;
  border: 1.5px solid transparent;
  font-size: 14px;
  align-items: center;
  height: 30px;
  transition: 50ms;
  cursor: pointer;
}

#win-explorer > .page > .main > .content > .view > .item:active {
  opacity: 0.7;
}

#win-explorer > .page > .main > .content > .view > .item > img {
  width: 25px;
  height: 25px;
  margin-right: 5px;
}

#win-explorer > .page > .main > .content > .view > .item.file > img {
  width: 22px;
  height: 22px;
  margin-left: 2px;
  margin-right: 7px;
}

#win-explorer > .page > .main > .content > .view > .item:hover {
  background-color: var(--hover, #e5e5e5);
  box-shadow: 0 1px 2px var(--s3d, rgba(0,0,0,0.1));
}

#win-explorer > .page > .main > .content > .view > .item.select {
  background-color: var(--hover, #e5e5e5);
}

#win-explorer > .page > .main > .content > .view > .item > .input {
  border-radius: 5px;
  font-size: 14px;
  border-width: 2px;
}

list {
  display: block;
}

list > a {
  display: block;
  color: inherit;
  text-decoration: none;
}

.a {
  color: inherit;
  text-decoration: none;
}

.btn {
  border-radius: 5px;
  cursor: pointer;
}

.btn-icon {
  padding: 5px;
}

.micaalt {
  background-color: var(--bg70, rgba(255,255,255,0.7));
  backdrop-filter: blur(20px);
}
</style>
