---
title: vue2中使用G6 自定义边绘制步骤条组件
date: 2021-4-22
sidebar: "auto"
publish: false
---

```html
<template>
  <div :id="container" ref="container" />
</template>
```

```javascript

  <script>
    const { ExtensionCategory, Graph, BaseEdge, positionOf, register } =
      window.G6;
    export default {
      name: "SnankStep",
      props: {
        data: {
          type: Object,
          default: () => ({})
        },
        cols: {
          type: Number,
          default: 7
        }
      },
      watch: {
        data: {
          async handler(newVal) {
            await this.$nextTick();
            this.setData(newVal);
          },
          deep: true,
          immediate: true
        }
      },
      data() {
        return {
          container: this.$common.newGuid(), // 生成唯一的容器 ID
          graph: null
        };
      },
      mounted() {
        this.$nextTick(() => {
          this.initGraph();
        });
      },
      destroyed() {
        if (this.graph) {
          this.graph.destroy();
          this.graph = null;
        }
      },
      methods: {
        setData(data) {
          this.graph.setData(data);
          const height = Math.floor(data.nodes.length / this.cols) * 150;
          this.graph.setOptions({
            height: Math.max(height, 230) // 更新高度
          });
          this.graph.layout();
        },
        // 将初始化逻辑封装到方法中
        async initGraph() {
          const data = {};

          class MyLineEdge extends BaseEdge {
            // getKeyStyle(attributes) {
            //   return { ...super.getKeyStyle(attributes) }
            // }

            getKeyPath(attributes) {
              const { sourceNode, targetNode } = this;
              const [x1, y1] = sourceNode.getPosition();
              const [x2, y2] = targetNode.getPosition();
              const midX = (x1 + x2) / 2;
              const radius = Math.abs(y1 - y2) / 2;
              const { source: prevPointId } =
                this.context.model
                  .getRelatedEdgesData(sourceNode.id)
                  .filter((item) => item.target === sourceNode.id)[0] || {};
              if (!prevPointId) {
                return [
                  ["M", x1, y1],
                  ["L", x2, y2]
                ];
              }
              const [lastX = 0] =
                positionOf(this.context.model.getNodeLikeDatum(prevPointId)) ||
                [];
              const sweepFlag = lastX - x1 < 0 ? 1 : 0; // 判断圆弧方向
              const offsetX = lastX - x1 < 0 ? 20 : -20; // 偏移量
              return [
                ["M", x1, y1],
                ["L", x1 + offsetX, y1],
                ["A", radius, radius, 0, 0, sweepFlag, midX + offsetX, y2],
                ["L", x2, y2]
              ];
            }
          }

          register(ExtensionCategory.EDGE, "s-polyline", MyLineEdge);

          this.graph = new Graph({
            container: this.container,
            data,
            background: "#fff",
            autoFit: "top",

            node: {
              type: "html",
              style: {
                innerHTML: `
            <div style="width: 22px; height: 22px;background:#fff;">
                <div style="width: 22px; height: 22px;  border: 2px solid #00b4be; border-radius: 50%;  padding: 4px;box-sizing:border-box;" >
                    <div style=" width: 10px; height: 10px;background: #00b4be; border-radius: 50%;"></div>
                </div>
            </div>

            `,
                dx: -11,
                dy: -11,
                badge: true,
                badges: (d) => {
                  return d.data.badges || [];
                }
              }
            },
            edge: {
              type: "s-polyline",
              style: {
                lineWidth: 2,
                stroke: (d) => (d.data.done ? "#00b4be" : "#00b4be")
              }
            },
            layout: {
              type: "snake",
              cols: this.cols,
              rowGap: 80,
              padding: [0, 100, 0, 100]
            }
            // behaviors: ['drag-canvas'] // 'zoom-canvas'
          });
          this.graph.render();
        }
      }
    };
  </script>
</template>
```

使用方法：

```html
<SnankStep :data="data" :cols="7" />
```

data 格式：

```json
{
  "nodes": [
    {
      "id": "0",
      "data": {
        "label": "【输液登记】",
        "time": "2025-03-24T14:08:17",
        "badges": [
          {
            "background": false,
            "fill": "#303030",
            "fontSize": 18,
            "fontWeight": 800,
            "offsetY": 30,
            "placement": "bottom",
            "text": "【输液登记】"
          },
          {
            "background": false,
            "fill": "#555",
            "fontSize": 16,
            "offsetY": 50,
            "placement": "bottom",
            "text": "管理员"
          },
          {
            "background": false,
            "fill": "#888c96",
            "fontSize": 12,
            "offsetY": 65,
            "placement": "bottom",
            "text": "14:08:17"
          },
          {
            "background": false,
            "fill": "#888c96",
            "fontSize": 12,
            "offsetY": 80,
            "placement": "bottom",
            "text": "2025-03-24"
          }
        ]
      }
    },
    {
      "id": "1",
      "data": {
        "label": "【核对上架】",
        "time": "2025-03-24T14:08:17",
        "badges": [
          {
            "background": false,
            "fill": "#303030",
            "fontSize": 18,
            "fontWeight": 800,
            "offsetY": 30,
            "placement": "bottom",
            "text": "【核对上架】"
          },
          {
            "background": false,
            "fill": "#555",
            "fontSize": 16,
            "offsetY": 50,
            "placement": "bottom",
            "text": "管理员"
          },
          {
            "background": false,
            "fill": "#888c96",
            "fontSize": 12,
            "offsetY": 65,
            "placement": "bottom",
            "text": "14:08:17"
          },
          {
            "background": false,
            "fill": "#888c96",
            "fontSize": 12,
            "offsetY": 80,
            "placement": "bottom",
            "text": "2025-03-24"
          }
        ]
      }
    },
    {
      "id": "2",
      "data": {
        "label": "【药品冲配】",
        "time": "2025-03-24T14:08:33",
        "badges": [
          {
            "background": false,
            "fill": "#303030",
            "fontSize": 18,
            "fontWeight": 800,
            "offsetY": 30,
            "placement": "bottom",
            "text": "【药品冲配】"
          },
          {
            "background": false,
            "fill": "#555",
            "fontSize": 16,
            "offsetY": 50,
            "placement": "bottom",
            "text": "sky2"
          },
          {
            "background": false,
            "fill": "#888c96",
            "fontSize": 12,
            "offsetY": 65,
            "placement": "bottom",
            "text": "14:08:33"
          },
          {
            "background": false,
            "fill": "#888c96",
            "fontSize": 12,
            "offsetY": 80,
            "placement": "bottom",
            "text": "2025-03-24"
          }
        ]
      }
    },
    {
      "id": "3",
      "data": {
        "label": "【药组执行】",
        "time": "2025-03-24T14:08:56",
        "badges": [
          {
            "background": false,
            "fill": "#303030",
            "fontSize": 18,
            "fontWeight": 800,
            "offsetY": 30,
            "placement": "bottom",
            "text": "【药组执行】"
          },
          {
            "background": false,
            "fill": "#555",
            "fontSize": 16,
            "offsetY": 50,
            "placement": "bottom",
            "text": "sky2"
          },
          {
            "background": false,
            "fill": "#888c96",
            "fontSize": 12,
            "offsetY": 65,
            "placement": "bottom",
            "text": "14:08:56"
          },
          {
            "background": false,
            "fill": "#888c96",
            "fontSize": 12,
            "offsetY": 80,
            "placement": "bottom",
            "text": "2025-03-24"
          }
        ]
      }
    },
    {
      "id": "4",
      "data": {
        "label": "【暂停滴液】",
        "time": "2025-03-24T14:14:02",
        "badges": [
          {
            "background": false,
            "fill": "#303030",
            "fontSize": 18,
            "fontWeight": 800,
            "offsetY": 30,
            "placement": "bottom",
            "text": "【暂停滴液】"
          },
          {
            "background": false,
            "fill": "#555",
            "fontSize": 16,
            "offsetY": 50,
            "placement": "bottom",
            "text": "sky2"
          },
          {
            "background": false,
            "fill": "#888c96",
            "fontSize": 12,
            "offsetY": 65,
            "placement": "bottom",
            "text": "14:14:02"
          },
          {
            "background": false,
            "fill": "#888c96",
            "fontSize": 12,
            "offsetY": 80,
            "placement": "bottom",
            "text": "2025-03-24"
          }
        ]
      }
    },
    {
      "id": "5",
      "data": {
        "label": "【药组执行】",
        "time": "2025-03-24T14:15:18",
        "badges": [
          {
            "background": false,
            "fill": "#303030",
            "fontSize": 18,
            "fontWeight": 800,
            "offsetY": 30,
            "placement": "bottom",
            "text": "【药组执行】"
          },
          {
            "background": false,
            "fill": "#555",
            "fontSize": 16,
            "offsetY": 50,
            "placement": "bottom",
            "text": "sky2"
          },
          {
            "background": false,
            "fill": "#888c96",
            "fontSize": 12,
            "offsetY": 65,
            "placement": "bottom",
            "text": "14:15:18"
          },
          {
            "background": false,
            "fill": "#888c96",
            "fontSize": 12,
            "offsetY": 80,
            "placement": "bottom",
            "text": "2025-03-24"
          }
        ]
      }
    },
    {
      "id": "6",
      "data": {
        "label": "【暂停滴液】",
        "time": "2025-03-24T14:23:35",
        "badges": [
          {
            "background": false,
            "fill": "#303030",
            "fontSize": 18,
            "fontWeight": 800,
            "offsetY": 30,
            "placement": "bottom",
            "text": "【暂停滴液】"
          },
          {
            "background": false,
            "fill": "#555",
            "fontSize": 16,
            "offsetY": 50,
            "placement": "bottom",
            "text": "sky2"
          },
          {
            "background": false,
            "fill": "#888c96",
            "fontSize": 12,
            "offsetY": 65,
            "placement": "bottom",
            "text": "14:23:35"
          },
          {
            "background": false,
            "fill": "#888c96",
            "fontSize": 12,
            "offsetY": 80,
            "placement": "bottom",
            "text": "2025-03-24"
          }
        ]
      }
    },
    {
      "id": "7",
      "data": {
        "label": "【药组执行】",
        "time": "2025-03-24T14:24:00",
        "badges": [
          {
            "background": false,
            "fill": "#303030",
            "fontSize": 18,
            "fontWeight": 800,
            "offsetY": 30,
            "placement": "bottom",
            "text": "【药组执行】"
          },
          {
            "background": false,
            "fill": "#555",
            "fontSize": 16,
            "offsetY": 50,
            "placement": "bottom",
            "text": "sky2"
          },
          {
            "background": false,
            "fill": "#888c96",
            "fontSize": 12,
            "offsetY": 65,
            "placement": "bottom",
            "text": "14:24:00"
          },
          {
            "background": false,
            "fill": "#888c96",
            "fontSize": 12,
            "offsetY": 80,
            "placement": "bottom",
            "text": "2025-03-24"
          }
        ]
      }
    }
  ],
  "edges": [
    { "source": "0", "target": "1", "data": { "done": true } },
    { "source": "1", "target": "2", "data": { "done": true } },
    { "source": "2", "target": "3", "data": { "done": true } },
    { "source": "3", "target": "4", "data": { "done": true } },
    { "source": "4", "target": "5", "data": { "done": true } },
    { "source": "5", "target": "6", "data": { "done": true } }
  ]
}
```
