# Obsidian多端同步化方案
## 前言
Notion与Obsidian是目前市场上功能最强大，使用用户最多，门槛也最高的两款笔记软件。本文不会对Notion和Obsidian两款笔记软件的优劣进行对比，但从两者的存储方式，我们可以看到Notion和Obsidian是两个极端——前者只支持云存储，后者只支持本地存储。

两者的使用定位也确实不同，Notion其强大功能却没法解决本地存储——只能通过导入的方式将Markdown文件下载在本地，可是我们能否为Obsidian这个本地存储的笔记软件提供一些同步化方案，使得我们在使用时可以跨设备的多端同步和备份呢？

## Remotely Save插件
下载Remotely Save插件，选择适合的云同步软件——本人使用Onedrive（个人版）作为云同步方案。
![image.png](https://cdn.jsdelivr.net/gh/Moyu-moyuing/ImageHostingWebsite@main/Img/202308221632467.png)
在选项中进行一些配置并登录Onedrive账号即可连接。
![image.png](https://cdn.jsdelivr.net/gh/Moyu-moyuing/ImageHostingWebsite@main/Img/202308221644647.png)
![image.png](https://cdn.jsdelivr.net/gh/Moyu-moyuing/ImageHostingWebsite@main/Img/202308221644569.png)
![image.png](https://cdn.jsdelivr.net/gh/Moyu-moyuing/ImageHostingWebsite@main/Img/202308221634626.png)
下面是一些基本配置选项：
- 鉴权登录OneDrive
- 设置远端基文件夹
- 测试连接
- 设置密码
- 设置是否自动运行——含有间隔时间
- 设置启动运行时间
- 设置大文件上传
- 设置并行度——最多同时上传多少文件
- 是否同步一些特殊文件夹（`_`开头）和配置文件夹（`.obsidian`）
![image.png](https://cdn.jsdelivr.net/gh/Moyu-moyuing/ImageHostingWebsite@main/Img/202308221640945.png)
OneDrive同步成功！

## Obsidian Git
下载Obsidian Git插件，在配置项中进行设置，使用`git bash`初始化后连接仓库即可。

::: tip 提示
本文默认您已了解Git相关操作以及GitHub的基本使用。
:::

1. 登录github创建新库，并为你的存放笔记的仓库取名。
   ![image.png](https://cdn.jsdelivr.net/gh/Moyu-moyuing/ImageHostingWebsite@main/Img/202308221649928.png)
	::: tip 提示
	这里你可以选择你的笔记是否公开，公开选择`public`，仅自己可见选择`private`。
 	:::
	
2. 进入你的Obsidian库文件夹，打开`git bash`并输入以下命令进行初始化。
   
	```bash
	git init
	```
	git初始化完成后，该文件夹会出现.git文件夹，可以新建一个.gitignore文件，用来存放你不想推送到github的文件，比如.obsidian等配置文件。
3. 配置源远程库并进行第一次提交。
   ```bash
	git add --all
	git commit -m "init"
	git remote add origin git@github.com:github名称/库名
	git push -u origin master or 其他分支名
	```
	上述是SSH配置方式，或者你可以采用HTTPS用户密码配置：
	 ```bash
	git add --all
	git commit -m "init"
	git remote add origin https://github.com/github名称/库名
	git push -u origin master or 其他分支名
	```

4. 到这里为止，github和Obsidian同步实际已经基本配置完毕，但每次提交时都需要手动打开bash输入命令太过麻烦，我们需要下载Obsidian Git简化流程。
   ![image.png](https://cdn.jsdelivr.net/gh/Moyu-moyuing/ImageHostingWebsite@main/Img/202308221707282.png)
5. 配置Obsidian Git选项。
   ![image.png](https://cdn.jsdelivr.net/gh/Moyu-moyuing/ImageHostingWebsite@main/Img/202308221708611.png)
	这里可以做一些自动化提交的设置，我并没有如此设置，个人需求是每次完成一天工作后进行手动提交。
	
	Obsidian侧边栏中有相关图形化操作，类似于VSCode的GitLens插件和源代码管理。
	![image.png](https://cdn.jsdelivr.net/gh/Moyu-moyuing/ImageHostingWebsite@main/Img/202308221711119.png)

至此，Obsidian同步化方案配置完毕。