# The integration process
This paper is intended to clarify the **logical integration** process of the OIH framework. In contrast to a **physical integration** (with a centralized data storage) the origin data will stay in the source database, but must by demand be transformed into the common data format (generic fields) of the integrated databases. A reliable integration must ensure a fluent interoperability between the associated data models and therewith a seamless business process. Therefore an application response time should not be [perceivable](https://stackoverflow.com/questions/536300/what-is-the-shortest-perceivable-application-response-delay) - due to delays.

**NOTE:** The ```Raw Data Format``` can be stored (on premise environment) within the connector. Also the naming can be miss leading while the ```Adapter``` translates the protocol and [transforms data format etc.](https://github.com/openintegrationhub/OIH-Board/blob/master/protocols/2017-11-13BoardWorkshop.md#adapter) but the ```Transformer``` includes [the mapping](https://github.com/openintegrationhub/OIH-Board/blob/master/protocols/2017-11-13BoardWorkshop.md#transformator).

![integration process diagram](https://github.com/openintegrationhub/Architecture/blob/master/Assets/IntegrationProcess.svg)

_There are cases to consider where an application (connector) is integrated to an existing environment, where the same objects (entities) potentially coexist inside multiple databases._

> When should duplicates (records) being processed - on use?

> In which cases, it is necessary to identify unique entities (objects) and how can those be managed?

> What steps does a record go through, between an app database and the queue?

## The connector

* consists of an adaptor (+ transformer - mapped fields)
* creates, reads, updates and deletes (db) records if permitted
<br><br>
* holds a valid access / service token
* creates tenants and returns its tenantIDs
* modifies tenants customer data

> What else needs to be done by the adapter, besides the protocol translation and data format transformation?

> What are the minimal functionalities of an adaptor?

A connector to the open integration hub can be stupid but also smart, which means that the simple version of a connector only requires a **syntactical mapping** (stupid connector) against the master data schema in order to become qualified. Whereas the next expansion stage also includes a manual **semantical mapping** (smart connector). The optional but smart connector should be written by someone who deeply understands the purpose of the underlying data model fields.

On the other hand, the provider of the master data schema must define the clear purpose of each field. Those have to reflect any required transformation case, within an integration environment. An independent development of connectors could be granted by handing out typical (test) data sets, which cover frequent transformation cases - aggregates (aka. business processes).

> How does a domain specific connector recognize the need to update a record?

> How is an adaptor (+ transformer) connected to the master data schema - in detail?

## The transformation - Adapter
The OIH data formats need to be truly understood by any party who converts data onto this standard.

> What needs to be taken into account, for developing the transformation logic?

## The mapping - Transformer
For the **syntactical mapping** it is necessary that the logic of a connector at least transforms the origin data types and formats towards those of the master data schema. After that the connector can be expanded by the **semantical mapping**, by initially connecting its transformed fields with the generic ones of the master data schema. A missed accordance on the contextual purpose of the origin fields, will counter the seamless business process workflow.

> How exactly - in which way - the semantic mapping is implemented?

> How can the usage context (aka. bounded context) of an entity type be sliced in the master data schema?

## The schema
The master data schema only consists of data fields, that need to be transformed between data models within a custom integration environment (an OIH instance). Aggregates - data flow patterns - point to reasonable shapes of entity types according to typical business processes (records) - of views (aka. user interfaces).

**NOTE:** A ```businessEntityID``` represents the business subject as a person or an organization. On this approach an inheritance (aka. relation or tree) can be defined by concatenated IDs of those entity types, an aggregate is built of. The usage context (aka. bounded context) is defined by the order of ```.typeObjects```. It is important that the ```.concatinationIDs``` consist of **reference keys**, as a logical syntax.

![Generic fields - concatenated typeObjects (trees)](https://github.com/openintegrationhub/Data-and-Domain-Models/blob/master/MasterDataModels/Assets/GenericFields.svg)

> What criteria have to be considered for shaping entity types - aggregates derived from bounded context (typical records) as tree structure?

_An address is unique, but can be used under certain circumstances in a variety of business contexts like mailing, shipping, accounting purposes and so on._

> What kind of attributes should be typified as enum, array or object in the master data schema?

> What steps could become necessary in order to replace/modify/extend the master data schema?