curl -XDELETE http://localhost:9200/solarpanels

curl -XPUT http://localhost:9200/solarpanels -d @update_mapping.json
