import{_ as n,c as e,b as a,o as l}from"./app-C5u-fe1q.js";const i="/assets/addtwonumber1-CArhL37F.jpg",d={};function t(r,s){return l(),e("div",null,[...s[0]||(s[0]=[a('<h2 id="本文说明" tabindex="-1"><a class="header-anchor" href="#本文说明"><span>本文说明</span></a></h2><p>用于整理链表类手撕代码题，后续会逐步加入题目、思路、模板代码和容易出错的边界情况。</p><h2 id="当前计划覆盖的题目" tabindex="-1"><a class="header-anchor" href="#当前计划覆盖的题目"><span>当前计划覆盖的题目</span></a></h2><ul><li>反转链表</li><li>合并两个有序链表</li><li>链表是否有环</li><li>删除链表倒数第 N 个节点</li><li>两两交换链表中的节点</li></ul><h2 id="常考题目" tabindex="-1"><a class="header-anchor" href="#常考题目"><span>常考题目</span></a></h2><h3 id="反转链表" tabindex="-1"><a class="header-anchor" href="#反转链表"><span>反转链表</span></a></h3><p>占位。</p><h2 id="面试真题" tabindex="-1"><a class="header-anchor" href="#面试真题"><span>面试真题</span></a></h2><h3 id="两数相加" tabindex="-1"><a class="header-anchor" href="#两数相加"><span>两数相加</span></a></h3><p>字节推荐架构一面。</p><p>https://leetcode.cn/problems/add-two-numbers/description/</p><h4 id="题目描述" tabindex="-1"><a class="header-anchor" href="#题目描述"><span>题目描述</span></a></h4><p>给你两个 <strong>非空</strong> 的链表，表示两个非负的整数。它们每位数字都是按照 <strong>逆序</strong> 的方式存储的，并且每个节点只能存储 <strong>一位</strong> 数字。</p><p>请你将两个数相加，并以相同形式返回一个表示和的链表。</p><p>你可以假设除了数字 0 之外，这两个数都不会以 0 开头。</p><p><img src="'+i+`" alt="img"></p><p><strong>示例 1：</strong></p><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text" data-title="text"><pre><code><span class="line">输入：l1 = [2,4,3], l2 = [5,6,4]</span>
<span class="line">输出：[7,0,8]</span>
<span class="line">解释：342 + 465 = 807.</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>示例 2：</strong></p><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text" data-title="text"><pre><code><span class="line">输入：l1 = [0], l2 = [0]</span>
<span class="line">输出：[0]</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>示例 3：</strong></p><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text" data-title="text"><pre><code><span class="line">输入：l1 = [9,9,9,9,9,9,9], l2 = [9,9,9,9]</span>
<span class="line">输出：[8,9,9,9,0,0,0,1]</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="题解" tabindex="-1"><a class="header-anchor" href="#题解"><span>题解</span></a></h4><p>两个指针同步遍历，额外一个变量储存进位标志符，做好判空处理即可。</p><div class="language-C++ line-numbers-mode" data-highlighter="prismjs" data-ext="C++" data-title="C++"><pre><code><span class="line">class Solution {</span>
<span class="line">public:</span>
<span class="line">    ListNode* addTwoNumbers(ListNode* l1, ListNode* l2) {</span>
<span class="line">        ListNode *head = nullptr, *tail = nullptr;</span>
<span class="line">        int carry = 0;</span>
<span class="line">        while (l1 || l2) {</span>
<span class="line">            int n1 = l1 ? l1-&gt;val: 0;</span>
<span class="line">            int n2 = l2 ? l2-&gt;val: 0;</span>
<span class="line">            int sum = n1 + n2 + carry;</span>
<span class="line">            if (!head) {</span>
<span class="line">                head = tail = new ListNode(sum % 10);</span>
<span class="line">            } else {</span>
<span class="line">                tail-&gt;next = new ListNode(sum % 10);</span>
<span class="line">                tail = tail-&gt;next;</span>
<span class="line">            }</span>
<span class="line">            carry = sum / 10;</span>
<span class="line">            if (l1) {</span>
<span class="line">                l1 = l1-&gt;next;</span>
<span class="line">            }</span>
<span class="line">            if (l2) {</span>
<span class="line">                l2 = l2-&gt;next;</span>
<span class="line">            }</span>
<span class="line">        }</span>
<span class="line">        if (carry &gt; 0) {</span>
<span class="line">            tail-&gt;next = new ListNode(carry);</span>
<span class="line">        }</span>
<span class="line">        return head;</span>
<span class="line">    }</span>
<span class="line">};</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,25)])])}const c=n(d,[["render",t]]),v=JSON.parse('{"path":"/blogs/shousidaima-lianbiaopian.html","title":"手撕代码-链表篇","lang":"zh-CN","frontmatter":{"title":"手撕代码-链表篇","date":"2026/03/30","tags":["链表","手撕代码"],"categories":["手撕代码"]},"headers":[{"level":2,"title":"本文说明","slug":"本文说明","link":"#本文说明","children":[]},{"level":2,"title":"当前计划覆盖的题目","slug":"当前计划覆盖的题目","link":"#当前计划覆盖的题目","children":[]},{"level":2,"title":"常考题目","slug":"常考题目","link":"#常考题目","children":[{"level":3,"title":"反转链表","slug":"反转链表","link":"#反转链表","children":[]}]},{"level":2,"title":"面试真题","slug":"面试真题","link":"#面试真题","children":[{"level":3,"title":"两数相加","slug":"两数相加","link":"#两数相加","children":[]}]}],"git":{"createdTime":1774878645000,"updatedTime":1775061960000,"contributors":[{"name":"JAHNAN00","email":"892961012@qq.com","commits":2}]},"filePathRelative":"blogs/手撕代码-链表篇.md"}');export{c as comp,v as data};
