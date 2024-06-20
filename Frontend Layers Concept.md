# Frontend Layers Concept

```
------------------------------------------------
|                 Components                   |
|          --------------------------          |
|          |  - Pages               |          |
|          |  - Features            |          |
|          |  - Atomics             |          |
|          --------------------------          |
|                       ^                      |
|                       |                      |
------------------------------------------------
                        | interacts with
                        v
------------------------------------------------
|                  Models                      |
|          --------------------------          |
|          |  Data Models           |          |
|          |  Data Manipulation     |          |
|          --------------------------          |
|                       ^                      |
|                       |                      |
------------------------------------------------
                        | reads data from
                        v
------------------------------------------------
|                  Services                    |
|          --------------------------          |
|          |  API Management        |          |
|          |  Backend Interaction   |          |
|          |  Data Transformation   |          |
|          --------------------------          |
------------------------------------------------
```

From top to bottom, we can separate different functions into distinct layers. This approach ensures that each layer has a single responsibility, making it easier to manage and evolve the application.

## Components

Including different hierarchical components, from pages to features to atomic components.

- Avoid complex business logic; focus on UI implementation.
- Connect to the Model State, reading state from the model layer. Data-Driven to re-render.
- Interact with Model Functions.

**Code Sample**

```typescript
export default function Page() {
  const id = params.id;
  const [cardIdList, cards, startSearch, getPage, searchText] = useStore(model);

  useEffect(() => {
    getPage(id);
  }, []);

  const handleSearch = (searchText) => {
    startSearch(searchText);
  };

  return (
    <Box>
      <SearchBar handleSearch={handleSearch} />
      {cardIdList.map((cardId) => {
        const card = cards[cardId];
        return <Card id={cardId} key={cardId} card={card} />;
      })}
    </Box>
  );
}
```

## Models

The model layer focuses on business logic and data manipulation. It is the core layer for addressing cache issues, duplicate requests, and stale data. This layer determines when to invoke services for real requests and handles tasks such as debouncing, throttling, caching, and managing data consistency.

- Data Model (Interface Constraints).
- Data Manipulation (Get data from Service).
- Manage business logic and data consistency/update mechanisms.

**Code Sample**

```typescript
// Define Data Model
export interface ICard {
  id: string;
  title: string;
  description: string;
}

export interface IPageState {
  cardIdList: string[];
  cards: Record<string, ICard>;
  searchText: string;
}

const initialState: IPageState = {
  cardIdList: [],
  cards: {},
  searchText: '',
};

export const model = createModel((hooks) => {
  const state = hooks.useState(initialState);

  const getPage = async (id: string) => {
    const data = await services.getPageData(id);
    state.setState({
      cardIdList: data.cardIdList,
      cards: data.cards,
    });
  };

  const startSearch = async (searchText: string) => {
    const data = await services.searchCards(searchText);
    state.setState({
      cardIdList: data.cardIdList,
      cards: data.cards,
      searchText,
    });
  };

  return {
    cardIdList: state.cardIdList,
    cards: state.cards,
    searchText: state.searchText,
    getPage,
    startSearch,
  };
});
```

## Services

In the service layer, we fetch data from the backend and then perform necessary transformations to align data for the frontend.

- API Management.
- Backend Interaction.
- Data Transformation (Extract, Transform).

**Code Sample**

```typescript
const api = {
  getPageData: {
    url: '/api/page',
    method: 'get',
  },
  searchCards: {
    url: '/api/search',
    method: 'get',
  },
};

const services = {
  getPageData: async (id) => {
    const response = await axios({
      ...api.getPageData,
      params: { id },
    });

    // Perform necessary data transformation
    return response.data;
  },

  searchCards: async (searchText) => {
    const response = await axios({
      ...api.searchCards,
      params: { q: searchText },
    });
    return response.data;
  },
};

export default services;
```

## Relationship

- Each layer reads data only from the layer below it and does not cross layers to interact.
- Different layers commonly do not correspond one-to-one, fully decoupling data, business logic, and presentation logic.

### Component to Model

- One-to-Many: One component binds to multiple models, such as a homepage or list pages.
- Many-to-One: Multiple components bind to one model, like user info displayed in different places on a single page.

### Model to Service

- One-to-Many: One comprehensive model can be composed of multiple APIs, e.g., integrating user info and user labels into one user model.
- Many-to-One: Multiple models are generated from one extensive API. For example, a complete API like a document can be dispatched into a User Model, Todo Model, and so on.
