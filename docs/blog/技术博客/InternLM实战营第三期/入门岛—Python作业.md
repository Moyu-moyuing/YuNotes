# 入门篇

## Python作业

### 任务一

实现一个wordcount函数，统计英文字符串中每个单词出现的次数。返回一个字典，key为单词，value为对应单词出现的次数。

输入：

```python
"""Hello world!  
This is an example.  
Word count is fun.  
Is it fun to count words?  
Yes, it is fun!"""
```

输出：

```python
{'hello': 1, 'world': 1, 'this': 1, 'is': 4, 'an': 1, 'example': 1, 'word': 1, 'count': 2,
'fun': 3, 'it': 2, 'to': 1, 'words': 1, 'yes': 1}
```

代码实现：

```python
import re

test_text = """Hello world!  
This is an example.  
Word count is fun.  
Is it fun to count words?  
Yes, it is fun!"""

def word_count(text):
    word_counts = {}
    words = re.sub(r'[^\w\s]', '', text.lower()).split()
    
    for word in words:
        if word in word_counts:
            word_counts[word] += 1
        else:
            word_counts[word] = 1
            
    return word_counts

result = word_count(test_text)
print(result)
```

运行结果：

![image.png](https://cdn.jsdelivr.net/gh/Moyu-moyuing/ImageHostingWebsite@main/Img/202407270038886.png)

```json
{'hello': 1, 'world': 1, 'this': 1, 'is': 4, 'an': 1, 'example': 1, 'word': 1, 'count': 2, 'fun': 3, 'it': 2, 'to': 1, 'words': 1, 'yes': 1}
```

### 任务二

使用本地vscode连接远程开发机，将上面所写的`wordcount`函数在开发机上进行debug，体验debug的全流程，并完成一份debug笔记。

debug调试命令：

![image.png](https://cdn.jsdelivr.net/gh/Moyu-moyuing/ImageHostingWebsite@main/Img/202407270047893.png)

正则表达式处理完后的`words`初始状态如下：

![image.png](https://cdn.jsdelivr.net/gh/Moyu-moyuing/ImageHostingWebsite@main/Img/202407270050997.png)

跑完一次循环后的`word_counts`字典变量如下：

![image.png](https://cdn.jsdelivr.net/gh/Moyu-moyuing/ImageHostingWebsite@main/Img/202407270052791.png)

我们可以看出最先被统计的`hello`已存入`word_counts`中，此时`word_counts`中只含有一对键值对，长度为1，即`'hello': 1`。在执行完所有循环后：

![image.png](https://cdn.jsdelivr.net/gh/Moyu-moyuing/ImageHostingWebsite@main/Img/202407270056423.png)
