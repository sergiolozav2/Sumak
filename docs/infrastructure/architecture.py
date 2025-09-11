

from diagrams import Diagram, Cluster, Edge
from diagrams.programming.language import Nodejs
from diagrams.programming.framework import React
from diagrams.custom import Custom
from components import HuaweiOBS, HuaweiOCR, HuaweiRDS, HuaweiModelArts


with Diagram("Cloud Architecture", show=False):
    # Endpoint icon (cellphone)
    endpoint = Custom("User", "./images/cellphone.png")

    # ECS cluster with React app and Node.js
    with Cluster("ECS"):
        react_app = React("Frontend (React)")
        ecs_node = Nodejs("Node.js App")

    # Huawei services grouped in a cluster
    with Cluster("Huawei"):
        obs = HuaweiOBS()
        ocr = HuaweiOCR()
        rds = HuaweiRDS("RDS (PostgreSQL)")
        modelarts = HuaweiModelArts("ModelArts")

    # Connections
    endpoint << Edge() >> react_app
    react_app << Edge() >> ecs_node
    ecs_node << Edge() >> rds
    ecs_node << Edge() >> obs
    ecs_node << Edge() >> ocr
    ecs_node << Edge() >> modelarts
