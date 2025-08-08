// src/utils/initialQuestions.ts

export interface Answer {
  id: string;
  text: string;
  createdAt: string;
}

export interface InitialQuestion {
  id: string;
  title: string;
  description: string;
  details?: string;
  tags?: string[];
  createdAt: string;
  answers?: Answer[];
}

export const initialQuestions: InitialQuestion[] = [
  {
    id: "6",
    title: "Usando VBA/Macro to close the Finder Window",
    description: `<p>I’m trying to write a simple VBA macro to run when i open a workbook. The macro will open a Finder window, change a couple of options, then close the window. this is to basically ‘set’ the default search options since (as far as I cant tell). Excel doesn’t allow you to change the default options. The problem I’m having is that i cannot find a way to get the macro to close the Finder window once it’s done. I’m still very much an amateur at this, which is probably contribuiting, but all my searches online eiither focus only on message boxes or aren’t related to what I’m trying to do. The code I have (currently it opens the window, I have to manually close it) is below.</p><div class="ql-code-block-container" spellcheck="false"><div class="ql-code-block">Private Sub Workbook_Open()</div><div class="ql-code-block">    Application.Dialogs(xlDialogFormulaFind).Show, 2, 2</div><div class="ql-code-block">End Sub</div></div><p>Has anyone successfully automated Finder window closures in VBA? I appreciate any pointers on sending the correct keystroke or using a hidden dialog approach.</p>`,
    details: `<p>The main thing I’ve actually tried is using sendkey to try and send an “Esc” command, but tht hasn’t worked; I saw no change at all in the window. I also tried DoEvents and AppActivate, but the Finder window remains on top. I haven’t found any subcommands for application or application.dialog that seems to work to close the window either.</p><p>I considered invoking an AppleScript from VBA, but I’m not sure how to bridge those two environments without losing stability. If there’s a pure-VBA or COM-based solution, that would be ideal.</p><p>Thanks in advance for any help on this tricky Finder automation!</p>`,
    tags: ["VBA", "Automation", "Finder", "Macros"],
    createdAt: "2025-05-31T17:03:05.690Z",
    answers: [
      {
        id: "1749239871458",
        text: `<p>Settings for Find are sticky, so if you perform a search using VBA then the settings you use become the default.</p><p><br></p><p><a href="https://learn.microsoft.com/en-us/office/vba/api/excel.range.find" rel="noopener noreferrer" target="_blank">https://learn.microsoft.com/en-us/office/vba/api/excel.range.find</a></p><div class="ql-code-block-container" spellcheck="false"><div class="ql-code-block">Private Sub Workbook_Open()</div><div class="ql-code-block">    Application.Dialogs(xlDialogFormulaFind).Show, 2, 2</div><div class="ql-code-block">End Sub</div></div><p><br></p><p>So just perform a Find() in VBA using the default settings you want. No need to show the dialog.</p>`,
        createdAt: "2025-06-06T19:57:51.458Z",
      },
    ],
  },
  {
    id: "5",
    title: "Setting up Cypress end-to-end tests for a Vite + React project",
    description: `<p>I'm getting ModuleNotFoundError when running Cypress tests in my Vite + React app. The same setup works fine in CRA. I suspect it’s related to Vite’s alias configuration. When I run <code>npx cypress open</code>, it fails to resolve <code>@/components/Button</code> even though my tsconfig paths and vite.config.ts are correct.</p><p>I tried adding <code>supportFile: false</code> and modifying <code>webpackConfig.resolve.alias</code>, but nothing worked. Below is my current plugin code:</p><div class="ql-code-block-container" spellcheck="false"><div class="ql-code-block">const { defineConfig } = require('cypress')</div><div class="ql-code-block">module.exports = defineConfig({</div><div class="ql-code-block">  e2e: {</div><div class="ql-code-block">    setupNodeEvents(on, config) {</div><div class="ql-code-block">      on('file:preprocessor', vitePreprocessor())</div><div class="ql-code-block">    },</div><div class="ql-code-block">    baseUrl: 'http://localhost:3000'</div><div class="ql-code-block">  }</div><div class="ql-code-block">})</div></div><p>Any suggestions on configuring <code>vitePreprocessor()</code> to pick up my Vite aliases?</p>`,
    details: `<p>I’ve also tried editing <code>cypress.config.ts</code> directly:</p><div class="ql-code-block-container" spellcheck="false"><div class="ql-code-block">import { defineConfig } from 'cypress'</div><div class="ql-code-block">import { mergeConfig } from 'vite'</div><div class="ql-code-block">import viteConfig from '../../vite.config'</div><div class="ql-code-block"></div><div class="ql-code-block">export default defineConfig({</div><div class="ql-code-block">  e2e: {</div><div class="ql-code-block">    setupNodeEvents(on, config) {</div><div class="ql-code-block">      return mergeConfig(config, viteConfig)</div><div class="ql-code-block">    },</div><div class="ql-code-block">    specPattern: 'cypress/e2e/**/*.cy.{js,jsx,ts,tsx}'</div><div class="ql-code-block">  }</div><div class="ql-code-block">})</div></div><p>But Cypress still can’t resolve the alias. I’m running Vite 4.3.7, Cypress 12.1.0, and React 18.2.0.</p><p>Any help is appreciated!</p>`,
    tags: ["Cypress", "Vite", "React", "Testing"],
    createdAt: "2025-05-28T20:40:21.556Z",
    answers: [],
  },
  {
    id: "4",
    title: "Optimizing React rendering with useMemo and useCallback",
    description: `<p>I have a component that's re-rendering too often. I tried wrapping callbacks in <code>useCallback</code> and values in <code>useMemo</code>, but the performance didn't improve. When I profile in React DevTools, it still shows frequent re-renders of my <code>ItemList</code> child component. Here’s a simplified snippet:</p><div class="ql-code-block-container" spellcheck="false"><div class="ql-code-block">function Parent() {</div><div class="ql-code-block">  const [count, setCount] = useState(0);</div><div class="ql-code-block">  const items = useMemo(() => fetchItems(), []);</div><div class="ql-code-block">  const handleClick = useCallback(() => setCount(count + 1), [count]);</div><div class="ql-code-block">  return (</div><div class="ql-code-block">    &lt;div&gt;</div><div class="ql-code-block">      &lt;button onClick={handleClick}&gt;Increment&lt;/button&gt;</div><div class="ql-code-block">      &lt;ItemList items={items} onSelect={handleSelect} /&gt;</div><div class="ql-code-block">    &lt;/div&gt;</div><div class="ql-code-block">  );</div><div class="ql-code-block">}</div><div class="ql-code-block"> </div><div class="ql-code-block">function ItemList({ items, onSelect }) {</div><div class="ql-code-block">  console.log('ItemList rendered');</div><div class="ql-code-block">  return items.map(item =&gt; &lt;div key={item.id} onClick={() =&gt; onSelect(item.id)}&gt;{item.name}&lt;/div&gt;);</div><div class="ql-code-block">}</div></div><p>Yet even with these hooks, <code>ItemList</code> still logs “rendered” every time <code>count</code> changes. What am I missing?</p>`,
    details: `<p>I also tried passing a stable <code>onSelect</code> via <code>useCallback</code> with an empty dependency array, but then I couldn’t reference the current <code>count</code>. I’m confused about how closure values interact with hooks. Should I wrap <code>items</code> in <code>useMemo</code> or wrap <code>Parent</code> in <code>React.memo</code>? Any guidance on preventing unnecessary re-renders would be great.</p>`,
    tags: ["React", "Performance", "useMemo", "useCallback"],
    createdAt: "2025-05-28T20:40:21.556Z",
    answers: [],
  },
  {
    id: "3",
    title:
      "How to intercept outgoing SQL statements using Quarkus + Hibernate Reactive (StatementInspector)",
    description: `<p>How can I intercept (and modify) outgoing SQL statements using Quarkus and Hibernate Reactive? I tried to do so by implementing a custom <code>StatementInspector</code>, but somehow the inspector is not being called. Here’s my implementation:</p><div class="ql-code-block-container" spellcheck="false"><div class="ql-code-block">public class MyInspector implements StatementInspector {</div><div class="ql-code-block">  @Override</div><div class="ql-code-block">  public String inspect(String sql) {</div><div class="ql-code-block">    System.out.println("Before SQL: " + sql);</div><div class="ql-code-block">    return sql.replace("SELECT", "SELECT /* intercepted */");</div><div class="ql-code-block">  }</div><div class="ql-code-block">}</div></div><p>Despite registering this class in <code>application.properties</code>, I see no output. I suspect it might be a classloading issue in the reactive CD pipeline.</p>`,
    details: `<p>In my <code>application.properties</code>, I have:</p><div class="ql-code-block-container" spellcheck="false"><div class="ql-code-block">quarkus.hibernate-reactive.sql-load-script=import.sql</div><div class="ql-code-block">hibernate.statement_inspector=com.example.MyInspector</div></div><p>I’ve confirmed that MyInspector is on the classpath. I also tried adding a CDI producer to inject it, but still no luck. Any ideas on why <code>inspect()</code> isn’t triggered?</p><p>Versions: Quarkus 2.7.3.Final, Hibernate Reactive 1.1.7.Final, Java 11.</p>`,
    tags: ["Quarkus", "Hibernate", "Reactive", "SQL"],
    createdAt: "2025-05-28T20:40:21.556Z",
    answers: [],
  },
  {
    id: "2",
    title:
      "Inconsistent results between custom function using terra and a simplified version to calculate global statistic of a raster",
    description: `<p>I am running an access poverty analysis on a raster of travel times. Using a slightly altered version of the Foster-Greer-Thorbecke index with exponent Alpha = 0, the following equality should hold:</p><div class="ql-code-block-container" spellcheck="false"><div class="ql-code-block">F_0 = \\sum_{i=1}^n \\frac{P_i}{Z_i} where P_i = poverty indicator, Z_i = travel time</div></div><p>However, my custom R function using <code>terra</code> returns different results than the simplified loop version:</p><div class="ql-code-block-container" spellcheck="false"><div class="ql-code-block">fn_custom <- function(raster, alpha) {</div><div class="ql-code-block">  vals <- values(raster)</div><div class="ql-code-block">  return(sum((vals)^alpha))</div><div class="ql-code-block">}</div><div class="ql-code-block"><br></div><div class="ql-code-block"># loop version</div><div class="ql-code-block">sum_loop <- 0</div><div class="ql-code-block">for(i in seq_along(vals)) {</div><div class="ql-code-block">  sum_loop <- sum_loop + (vals[i])^alpha</div><div class="ql-code-block">}</div></div><p>What could cause these two methods to diverge?</p>`,
    details: `<p>I suspect it might be related to how <code>terra::values()</code> handles NA values or data types (integer vs. numeric). I tried coercing the raster to <code>as.numeric()</code>, but still see mismatches. I also wondered if memory fragmentation in large raster objects affects the sum. Any insight into terra’s internals or best practices would be helpful.</p><p>Packages: terra 1.5-20, R 4.2.1.</p><p>Example data: a 1000x1000 travel-time raster in GeoTIFF format.</p>`,
    tags: ["R", "terra", "Raster", "Statistics"],
    createdAt: "2025-05-28T20:40:21.556Z",
    answers: [],
  },
  {
    id: "1",
    title: "Sphinx PDF build failing on readthedocs for Russian translation",
    description: `<p>PDF build of Sphinx’s own documentation are failing for Russian translation (example build). .readthedocs.yml is set to build HTML and then PDF, and it's in the second step the failure arises lorem ipsum dolor sit amet lorem ipsum dolor adsasdasd.</p><p>I’m using <code>rst2pdf</code> extension and my <code>conf.py</code> includes custom settings for <code>babel</code>. Here’s the relevant snippet:</p><div class="ql-code-block-container" spellcheck="false"><div class="ql-code-block">extensions = [</div><div class="ql-code-block">    'sphinx.ext.autodoc',</div><div class="ql-code-block">    'rst2pdf.pdfbuilder',</div><div class="ql-code-block">]</div><div class="ql-code-block"><br></div><div class="ql-code-block">pdf_documents = [ ('index','MyProject', 'My Project Documentation', 'Author'), ]</div><div class="ql-code-block"><br></div><div class="ql-code-block">language = 'ru'</div></div><p>When I run <code>make latexpdf</code> on Read the Docs, I see errors about missing fonts and encoding mismatches. It looks like the build uses <code>pdflatex</code> instead of <code>xetex</code> for Russian, causing issues.</p>`,
    details: `<p>I tried forcing <code>xetex</code> by adding <code>latex_engine = 'xelatex'</code> to <code>conf.py</code>, but Read the Docs ignores that setting. I also changed <code>locale-gen</code> to include <code>ru_RU.UTF-8</code>. Despite these changes, the log still shows:</p><div class="ql-code-block-container" spellcheck="false"><div class="ql-code-block">! Undefined control sequence.</div><div class="ql-code-block">l.23 \\begin{document}</div></div><p>Any suggestions on how to force RTD to use Xelatex or another engine that supports Cyrillic? I appreciate any tips for troubleshooting builds on their platform.</p>`,
    tags: ["Sphinx", "Read the Docs", "LaTeX", "Localization"],
    createdAt: "2025-05-28T20:40:21.556Z",
    answers: [],
  },
];
