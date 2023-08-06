import { Discussion } from '@/app/lib/discussion';
import { getDiscussion, listDiscussions } from '@/app/lib/github'
import { graphql } from '@octokit/graphql'
import { Festive } from 'next/font/google';

jest.mock('@octokit/graphql', () => {
  const mock = jest.fn();
  return ({
    graphql: {
      defaults: () => mock,
      mock
    }
  })
})

const discussions: Discussion[] = [Discussion.from({
  "title": "나만의 개발 블로그 만들기",
  "createdAt": "2023-08-02T15:19:37Z",
  "updatedAt": "2023-08-03T15:42:32Z",
  "body": "~~~\r\nslug: developing-my-own-blog\r\ndescription: \r\ntoc: \r\nog_image: \r\ncover_image: \r\n~~~\r\n\r\n갑자기 개발 블로그를 만들어보고 싶은 생각이 들었다. 그리고 나의 삽질이 시작되었다\r\n\r\n------\r\n\r\n# 갑자기 개발 블로그를 만들어보고 싶은 생각이 들었다\r\n\r\n1주일간의 휴가, 휴가기간동안 뭘할까 생각해보다가 개발 블로그를 만들어보면 어떨까 생각을 했다.\r\n여러가지 리서치한 것들을 잊지 않기 위한것도 있고, 이야기를 할때 정리도 설명도 잘 안되는 것 같아서\r\n블로그 컨텐트를 만들어 나가다 보면 조금이라도 남에게 쉽게 설명할수 있는 스킬이 늘어나지 않을까 싶었다.\r\n\r\n앞으로 여러가지 이야기를 나눠보면서 연습을 해보려고 한다.\r\n\r\n\r\n# 개발 스택?\r\n\r\n블로그 포스트 - github discussion\r\n댓글 - discussion comment\r\nSSG - nextjs\r\n조회수 - google analysis\r\n\r\nmdx vs contentlayer\r\n\r\n테마 스타일링은 어떻게 해야하나\r\n\r\n# slug는 어디에?\r\nslug와 타이틀을 어떤 규칙으로 만들지에 대해서 많이 고민헀던것 같다.\r\nmd파일만 사용할 경우에는 특별한 답이 없는것 같다.\r\n그래서 아마 gray-matter등을 사용해서 title, slug를 모두 지정하는 방식을 쓰는듯했었다..\r\ntimomeh는 discussion의 title을 slug로 사용했다.\r\n처음에는 이 방향으로 해볼까 했는데, 아무래도 한국인이다보니 화면에 영어 slug로 표시되는게 영 불편했었다..\r\n\r\n왜 timomeh는 title을 slug로 사용했을까.. 혹시 네트워크나 로직상 유리한것이 있는것일까?\r\n\r\n많이 고민했었는데, 결국 화면 구성상 front-matter요소가 들어가야만 했고, 그렇다면 그다지 고민할것이 없었다.\r\n그냥 내가 편한대로 정하면 되는것이였다. (아마도 이런게 또 직접 만드는 블로그의 묘미겠지)\r\n\r\n# 포스트 리스팅\r\ngithub discussion은 cursor를 통한 더보기 방식 pagination만 지원하고 있다.\r\n일반적으로는 문제 없을거 같은데, (솔직히 그럴리는 없겠지만) 매우 큰 페이지를 지원해야하게 된다면 문제가 될수는 있을것 같았다.\r\n이부분을 어떻게 해결해야할지도 고민해볼 거리일것 같다\r\n\r\n### 참고 사이트\r\n- [인파님 블로그](https://inpa.tistory.com/entry/TS-%F0%9F%93%98-%ED%83%80%EC%9E%85%EC%8A%A4%ED%81%AC%EB%A6%BD%ED%8A%B8-%EB%AA%A8%EB%93%88-%EB%84%A4%EC%9E%84%EC%8A%A4%ED%8E%98%EC%9D%B4%EC%8A%A4-%EC%8B%9C%EC%8A%A4%ED%85%9C-%EC%9D%B4%ED%95%B4%ED%95%98%EA%B8%B0)\r\n  - 중간중간 카드 형식으로 단절되어 있는게 눈에 띄는듯\r\n\r\n- https://timomeh.de/posts/how-i-built-this-blog\r\n  - 아마 많이 참고하게될 사이트, 나와 기본적인 설계도 거의 똑같다\r\n\r\n",
  "bodyHTML": "<div class=\"snippet-clipboard-content notranslate position-relative overflow-auto\" data-snippet-clipboard-copy-content=\"slug: developing-my-own-blog\ndescription: \ntoc: \nog_image: \ncover_image: \"><pre class=\"notranslate\"><code class=\"notranslate\">slug: developing-my-own-blog\ndescription: \ntoc: \nog_image: \ncover_image: \n</code></pre></div>\n<p dir=\"auto\">갑자기 개발 블로그를 만들어보고 싶은 생각이 들었다. 그리고 나의 삽질이 시작되었다</p>\n<hr>\n<h1 dir=\"auto\">갑자기 개발 블로그를 만들어보고 싶은 생각이 들었다</h1>\n<p dir=\"auto\">1주일간의 휴가, 휴가기간동안 뭘할까 생각해보다가 개발 블로그를 만들어보면 어떨까 생각을 했다.<br>\n여러가지 리서치한 것들을 잊지 않기 위한것도 있고, 이야기를 할때 정리도 설명도 잘 안되는 것 같아서<br>\n블로그 컨텐트를 만들어 나가다 보면 조금이라도 남에게 쉽게 설명할수 있는 스킬이 늘어나지 않을까 싶었다.</p>\n<p dir=\"auto\">앞으로 여러가지 이야기를 나눠보면서 연습을 해보려고 한다.</p>\n<h1 dir=\"auto\">개발 스택?</h1>\n<p dir=\"auto\">블로그 포스트 - github discussion<br>\n댓글 - discussion comment<br>\nSSG - nextjs<br>\n조회수 - google analysis</p>\n<p dir=\"auto\">mdx vs contentlayer</p>\n<p dir=\"auto\">테마 스타일링은 어떻게 해야하나</p>\n<h1 dir=\"auto\">slug는 어디에?</h1>\n<p dir=\"auto\">slug와 타이틀을 어떤 규칙으로 만들지에 대해서 많이 고민헀던것 같다.<br>\nmd파일만 사용할 경우에는 특별한 답이 없는것 같다.<br>\n그래서 아마 gray-matter등을 사용해서 title, slug를 모두 지정하는 방식을 쓰는듯했었다..<br>\ntimomeh는 discussion의 title을 slug로 사용했다.<br>\n처음에는 이 방향으로 해볼까 했는데, 아무래도 한국인이다보니 화면에 영어 slug로 표시되는게 영 불편했었다..</p>\n<p dir=\"auto\">왜 timomeh는 title을 slug로 사용했을까.. 혹시 네트워크나 로직상 유리한것이 있는것일까?</p>\n<p dir=\"auto\">많이 고민했었는데, 결국 화면 구성상 front-matter요소가 들어가야만 했고, 그렇다면 그다지 고민할것이 없었다.<br>\n그냥 내가 편한대로 정하면 되는것이였다. (아마도 이런게 또 직접 만드는 블로그의 묘미겠지)</p>\n<h1 dir=\"auto\">포스트 리스팅</h1>\n<p dir=\"auto\">github discussion은 cursor를 통한 더보기 방식 pagination만 지원하고 있다.<br>\n일반적으로는 문제 없을거 같은데, (솔직히 그럴리는 없겠지만) 매우 큰 페이지를 지원해야하게 된다면 문제가 될수는 있을것 같았다.<br>\n이부분을 어떻게 해결해야할지도 고민해볼 거리일것 같다</p>\n<h3 dir=\"auto\">참고 사이트</h3>\n<ul dir=\"auto\">\n<li>\n<p dir=\"auto\"><a href=\"https://inpa.tistory.com/entry/TS-%F0%9F%93%98-%ED%83%80%EC%9E%85%EC%8A%A4%ED%81%AC%EB%A6%BD%ED%8A%B8-%EB%AA%A8%EB%93%88-%EB%84%A4%EC%9E%84%EC%8A%A4%ED%8E%98%EC%9D%B4%EC%8A%A4-%EC%8B%9C%EC%8A%A4%ED%85%9C-%EC%9D%B4%ED%95%B4%ED%95%98%EA%B8%B0\" rel=\"nofollow\">인파님 블로그</a></p>\n<ul dir=\"auto\">\n<li>중간중간 카드 형식으로 단절되어 있는게 눈에 띄는듯</li>\n</ul>\n</li>\n<li>\n<p dir=\"auto\"><a href=\"https://timomeh.de/posts/how-i-built-this-blog\" rel=\"nofollow\">https://timomeh.de/posts/how-i-built-this-blog</a></p>\n<ul dir=\"auto\">\n<li>아마 많이 참고하게될 사이트, 나와 기본적인 설계도 거의 똑같다</li>\n</ul>\n</li>\n</ul>",
  "number": 2,
  "category": {
    "id": "DIC_kwDOKBTh6s4CYOSJ"
  }
}), Discussion.from({
  "title": "테스트 포스트",
  "createdAt": "2023-08-01T15:19:37Z",
  "updatedAt": "2023-08-02T15:42:32Z",
  "body": "~~~\r\nslug: test-post\r\ndescription: \r\ntoc: \r\nog_image: \r\ncover_image: \r\n~~~\r\n\r\n이거슨 테스트\r\n\r\n------\r\n\r\n# test post\r\n  test test test test\r\n\r\n",
  "bodyHTML": "<div>some html</div>",
  "number": 3,
  "category": {
    "id": "DIC_kwDOKBTh6s4CYOSJ"
  }
})];

describe('Github Discussion 호출시에', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  it('list parameter를 제대로 전달한다', async () => {
    const slug = 'example-slug';

    getMock().mockResolvedValueOnce({
      repository: {
        discussions: {
          pageInfo: {
            hasNextPage: false,
            endCursor: "Y3Vyc29yOnYyOpK5MjAyMy0wNy0zMFQxNTozNToxNSswOTowMM4AUzqZ"
          },
          nodes: []
        }
      },
    })

    await listDiscussions({category: "posts"})

    expect(getMock()).toHaveBeenCalledWith(expect.any(String), {
      after: null,
      categoryId: "DIC_kwDOKBTh6s4CYOSJ",
      owner: process.env.GITHUB_OWNER,
      repo: process.env.GITHUB_REPOSITORY,
      size: 100,
    })
  })

  it('list discussions', async () => {
    const slug = 'example-slug'

    getMock().mockResolvedValueOnce({
      repository: {
        discussions: {
          pageInfo: {
            hasNextPage: false,
            endCursor: "Y3Vyc29yOnYyOpK5MjAyMy0wNy0zMFQxNTozNToxNSswOTowMM4AUzqZ"
          },
          nodes: discussions
        }
      },
    })

    const result = await listDiscussions({category: "posts"})

    expect(result).toEqual(discussions)
  })

  it('should return undefined if no discussion is found', async () => {
    const slug = 'non-existent-slug';

    getMock().mockResolvedValueOnce({
      search: {
        edges: [],
      },
    });

    const result = await getDiscussion({slug, category: "posts"})

    expect(result).toBeUndefined()
  })
})

function getMock() {
  return (graphql as typeof graphql & { mock: jest.Mock; }).mock;
}
