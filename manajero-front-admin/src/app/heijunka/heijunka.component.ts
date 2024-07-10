import { Component, OnInit } from '@angular/core';
import {AngularEditorConfig} from '@kolkov/angular-editor';
import {DomSanitizer, SafeHtml} from '@angular/platform-browser';

@Component({
  selector: 'ngx-heijunka',
  templateUrl: './heijunka.component.html',
  styleUrls: ['./heijunka.component.scss'],
})
export class HeijunkaComponent implements OnInit {
  purposeContent: string = `<h5>The "What" of Heijunka</h5><p><strong>Heijunka</strong> is a Japanese term for "production leveling." It minimizes waste and enhances efficiency by balancing production types and quantities over time, reducing unevenness (Mura) for a consistent schedule.</p>
<h6>Key Elements</h6>
            <ul>
              <li><strong>Level Production:</strong> Ensures consistent production to meet customer demand.</li>
              <li><strong>Mixed Model Production:</strong> Produces various products in smaller batches to avoid bottlenecks and reduce inventory.</li>
              <li><strong>Takt Time Alignment:</strong> Matches production speed with customer demand to prevent overproduction.</li>
            </ul>

            <h6>Purpose</h6>
            <ul>
              <li><strong>Reduce Waste:</strong> Minimizes overproduction, waiting times, and excess inventory.</li>
              <li><strong>Improve Efficiency:</strong> Ensures smooth flow of work and materials, reducing lead times.</li>
              <li><strong>Enhance Flexibility:</strong> Enables quick response to market changes without disruptions.</li>
            </ul>

            <h6>Benefits</h6>
            <ul>
              <li><strong>Stability in Production:</strong> Reduces volatility and stress in the production system.</li>
              <li><strong>Quality Improvement:</strong> Maintains and enhances product quality through consistent processes.</li>
              <li><strong>Cost Reduction:</strong> Minimizes costs related to excess inventory, overtime, and expedited shipping.</li>
            </ul>`;
  motivationContent: string = `<h5>The "Why" of Heijunka</h5>
            <p><strong>Heijunka</strong> in lean manufacturing optimizes production processes for efficiency. Here’s why it's crucial:</p>

            <ol>
              <li>
                <h6>Reduce Variability and Unevenness</h6>
                <p>Leveling production minimizes inefficiencies like overproduction and excess inventory.</p>
                <p>Benefits: Smoother flow reduces downtime and stress.</p>
              </li>

              <li>
                <h6>Improve Efficiency and Productivity</h6>
                <p>Balance workloads to prevent bottlenecks and optimize resources.</p>
                <p>Benefits: Consistent output improves satisfaction.</p>
              </li>

              <li>
                <h6>Enhance Flexibility and Responsiveness</h6>
                <p>Adapt to market changes efficiently.</p>
                <p>Benefits: Quick response reduces emergencies.</p>
              </li>

              <li>
                <h6>Minimize Waste and Costs</h6>
                <p>Align production with demand to reduce waste and costs.</p>
                <p>Benefits: Lower costs and competitive pricing.</p>
              </li>

              <li>
                <h6>Support Continuous Improvement</h6>
                <p>Stable production enables ongoing improvements.</p>
                <p>Benefits: Enhance efficiency and innovation.</p>
              </li>

              <li>
                <h6>Improve Quality</h6>
                <p>Maintain consistent product quality.</p>
                <p>Benefits: Higher standards enhance satisfaction.</p>
              </li>
            </ol>`;
  methodContent: string = `<h5>The "How" of Heijunka</h5>
            <p>Implementing Heijunka involves steps to ensure a balanced and efficient production process:</p>

            <ol>
              <li>
                <h6>Assess Current Production Process</h6>
                <p>Analyze production to identify variability (Mura) and collect data on volumes, lead times, and demand patterns.</p>
              </li>

              <li>
                <h6>Calculate Takt Time</h6>
                <p>Determine the rate needed to meet customer demand by dividing available production time by demand.</p>
              </li>

              <li>
                <h6>Develop a Production Schedule</h6>
                <p>Create a leveled schedule to evenly distribute production, guided by calculated takt time.</p>
              </li>

              <li>
                <h6>Implement Mixed Model Production</h6>
                <p>Produce variety in smaller batches to reduce bottlenecks and inventory levels.</p>
              </li>

              <li>
                <h6>Use Heijunka Box</h6>
                <p>Visualize and manage production with a Heijunka box for balanced scheduling.</p>
              </li>

              <li>
                <h6>Monitor and Adjust</h6>
                <p>Regularly review and adjust production to maintain efficiency.</p>
              </li>

              <li>
                <h6>Engage in Continuous Improvement (Kaizen)</h6>
                <p>Promote ongoing improvements by involving employees in process enhancements.</p>
              </li>
            </ol>`;
  HypothesesContent: string = `<h5>The "What If" of Heijunka</h5>
            <p><strong>Heijunka</strong> can be explored through Active Experimentation, applying principles to different scenarios:</p>

            <h6>Application and Testing</h6>
            <p>Pilot Heijunka in a small area, measuring impacts on efficiency, waste reduction, quality, and flexibility. Adjust practices based on results.</p>

            <h6>Hypothetical Scenarios</h6>
            <p>Consider scenarios:</p>
            <ul>
              <li><strong>Increased Demand:</strong> Manage sudden increases efficiently.</li>
              <li><strong>Supply Chain Disruptions:</strong> Maintain stability during disruptions.</li>
              <li><strong>Product Mix Changes:</strong> Ensure smooth transitions.</li>
            </ul>

            <h6>Exploring Outcomes</h6>
            <p>Apply Heijunka to:</p>
            <ul>
              <li><strong>Identify Best Practices:</strong> Implement effectively in diverse environments.</li>
              <li><strong>Drive Improvement:</strong> Enhance processes continuously.</li>
              <li><strong>Enhance Adaptability:</strong> Respond swiftly to market changes.</li>
            </ul>`;
  step1Content: string = '<h6>Understand Customer Demand</h6>\nAnalyze historical sales data, forecast future demand, and identify seasonal trends to determine average customer demand.';
  step2Content: string =  '<h6>Calculate Takt Time</h6>\nTakt time = Available production time / Customer demand. Ensures production aligns with demand.';
  step3Content: string =  '<h6>Implement Level Production</h6>\nDistribute production evenly over time based on calculated takt time. Adjust schedules and resources for consistency.';
  step4Content: string = '<h6>Use Mixed Model Production</h6>\nProduce different products in small batches within the same period to prevent bottlenecks and enhance flexibility.';
  step5Content: string = '<h6>Monitor and Adjust</h6>\nContinuously monitor production performance, track KPIs, and implement improvements for optimized efficiency.';
  historyContent: SafeHtml = `            <h5>Origins and Development at Toyota</h5>
<p><strong>Heijunka</strong> has a rich history rooted in the development of the Toyota Production System. Its principles have been instrumental in shaping modern manufacturing practices, emphasizing the importance of production leveling to achieve efficiency, reduce waste, and respond flexibly to customer demand.</p>
<h6>Early 20th Century and Sakichi Toyoda:</h6>
            <div style="text-align:center;">
              <img src="../../assets/heijunka/Sakichi.jpeg" alt="Sakichi Toyoda" style="width:100%;max-width:400px;">
            </div>
            <ul>
              <li>The roots of heijunka can be traced back to Sakichi Toyoda, the founder of Toyota Industries and an inventor who focused on improving efficiency in textile manufacturing.</li>
              <li>He developed the automatic loom, which incorporated the principle of stopping when a problem occurred, laying the groundwork for the emphasis on quality and efficiency in production processes.</li>
            </ul>

            <h6>Kiichiro Toyoda and Just-in-Time (JIT):</h6>
            <div style="text-align:center;">
              <img src="../../assets/heijunka/kiichiro.jpg" alt="Kiichiro Toyoda" style="width:100%;max-width:400px;">
            </div>
            <ul>
              <li>Sakichi's son, Kiichiro Toyoda, took the principles of efficiency and continuous improvement further when he founded Toyota Motor Corporation.</li>
              <li>In the 1930s and 1940s, Kiichiro introduced the concept of Just-in-Time production, which emphasized producing only what was needed, when it was needed, and in the amount needed.</li>
              <li>This approach helped reduce waste and inventory costs.</li>
            </ul>

            <h6>Post-War Japan and Taiichi Ohno:</h6>
            <div style="text-align:center;">
              <img src="../../assets/heijunka/Taiichi.jpg" alt="Taiichi Ohno" style="width:550px;">
            </div>
            <ul>
              <li>After World War II, Japan faced economic difficulties, which forced companies like Toyota to find ways to optimize production with limited resources.</li>
              <li>Taiichi Ohno, an engineer at Toyota, played a crucial role in developing the Toyota Production System (TPS) during the 1950s and 1960s.</li>
              <li>He observed that traditional mass production methods, characterized by large batch sizes and high inventory levels, led to inefficiencies and waste.</li>
            </ul>

            <h6>Market Efficiency of Heijunka:</h6>
            <ul>
              <li>Taiichi Ohno introduced heijunka as a way to level the production schedule, thereby smoothing out the fluctuations in production that caused inefficiencies.</li>
              <li>Heijunka involves distributing production evenly over time, which reduces the bullwhip effect—large fluctuations in inventory levels and production rates caused by inconsistent demand.</li>
            </ul>

            <h5>Global Influence and Modern Application</h5>

            <h6>Spread of Lean Manufacturing:</h6>
            <div style="text-align:center;">
              <img src="../../assets/heijunka/Lean-manufacturing.jpg" alt="Lean Manufacturing" style="width:100%;max-width:400px;">
            </div>
            <ul>
              <li>The success of the Toyota Production System and its principles, including heijunka, led to the widespread adoption of lean manufacturing practices worldwide.</li>
              <li>Companies across various industries began to implement heijunka and other lean tools to improve efficiency and competitiveness.</li>
            </ul>

            <h6>Continuous Improvement and Evolution:</h6>
            <ul>
              <li>Heijunka continues to evolve as companies integrate advanced technologies such as automation, real-time data analytics, and artificial intelligence to further enhance production leveling and responsiveness.</li>
            </ul>`;
  cycleContent: SafeHtml = ` <h5>Level-loading Heijunka Cycle</h5>
            <p><strong>Heijunka</strong>, also known as level-loading or production-smoothing, is essential in the Toyota Production System. It stabilizes operations by leveling workload unevenness (mura) in volume and mix over time (see Figure 1). Heijunka uses boxes for scheduling to reduce lead time, inventory, and worker stress. Prerequisites include quick changeovers, capable processes, standardized work, visual management, and understanding customer demand.</p>
            <div style="text-align:center;">
              <img src="../../assets/heijunka/heijunka-graph.png" style="width:100%;">
            </div>
            <p>The <strong>Heijunka</strong> cycle (Ch) is a repeatable production sequence for mix leveling. Lean practitioners calculate it using spreadsheets and iterations, followed by PDCA at the gemba. See Figures 2 and 3 for examples and formulas. Ch serves as a design parameter rather than a rigid blueprint, similar to takt time.</p>
            <div style="text-align:center;">
              <img src="../../assets/heijunka/Calculation.png" alt="Example heijunka cycle calculation" style="width:100%;">
            </div>

            <div style="text-align:center;">
              <img src="../../assets/heijunka/heijunka-sequence.png" alt="Heijunka cycle illustrated" style="width:100%;height:500px">
            </div>
            <div style="text-align:center;">
              <img src="../../assets/heijunka/heijunka-text1.png" alt="Example heijunka cycle calculation" style="width:100%;">
            </div>`;

  editorConfig: AngularEditorConfig = {
    editable: true,
    spellcheck: true,
    height: 'auto',
    minHeight: '200px',
    placeholder: 'Enter text here...',
    translate: 'no',
  };
  titles: string[] = ['Heijunka', '平準化'];
  currentTitleIndex: number = 0;
  fadeIn: boolean = false;
  isEditingPurpose: boolean = false;
  isEditingMotivation: boolean = false;
 isEditingMethod: boolean = false;
 isEditingHypotheses: boolean = false;
  isEditingStep1 = false;
  isEditingStep2 = false;
  isEditingStep3 = false;
  isEditingStep4 = false;
  isEditingStep5 = false;
  isEditingHistory = false;
  isEditingCycle = false;
  constructor(private sanitizer: DomSanitizer) {
    this.switchTitles();

  }

  ngOnInit(): void {
    this.loadPurposeContentFromLocalStorage();
    if (typeof this.historyContent === 'string') {
      this.historyContent = this.sanitizer.bypassSecurityTrustHtml(this.historyContent);
    }
    if (typeof this.cycleContent === 'string') {
      this.cycleContent = this.sanitizer.bypassSecurityTrustHtml(this.cycleContent);
    }
  }

  startEditingPurpose(): void {
    this.isEditingPurpose = true;
  }

  savePurposeChanges(): void {
    localStorage.setItem('purposeContent', this.purposeContent);
    this.isEditingPurpose = false;
  }

  cancelEditing(): void {
    this.loadPurposeContentFromLocalStorage();
    this.isEditingPurpose = false;
  }

  loadPurposeContentFromLocalStorage(): void {
    this.purposeContent = localStorage.getItem('purposeContent') || this.purposeContent;
  }
  startEditingMotivation(): void {
    this.isEditingMotivation = true;
  }

  saveMotivationChanges(): void {
    localStorage.setItem('motivationContent', this.motivationContent);
    this.isEditingMotivation = false;
  }

  cancelMotivationEditing(): void {
    this.loadMotivationContentFromLocalStorage();
    this.isEditingMotivation = false;
  }

  loadMotivationContentFromLocalStorage(): void {
    this.motivationContent = localStorage.getItem('motivationContent') || this.motivationContent;
  }
  startEditingMethod(): void {
    this.isEditingMethod = true;
  }
  saveEditingMethod(): void {
    localStorage.setItem('methodContent', this.methodContent);
    this.isEditingMethod = false;
  }
  cancelEditingMethod(): void {
    this.loadMethodContentFromLocalStorage();
    this.isEditingMethod = false;
  }
  loadMethodContentFromLocalStorage(): void {
    this.methodContent = localStorage.getItem('methodContent') || this.methodContent;
  }
  startEditingHypotheses(): void {
    this.isEditingHypotheses = true;
  }
  saveHypothesesChanges(): void {
    localStorage.setItem('HypothesesContent', this.HypothesesContent);
    this.isEditingHypotheses = false;
  }
  cancelHypothesesEditing(): void {
    this.loadHypothesesContentFromLocalStorage();
    this.isEditingHypotheses = false;
  }
  loadHypothesesContentFromLocalStorage(): void {
    this.HypothesesContent = localStorage.getItem('HypothesesContent') || this.HypothesesContent;
  }
  startEditingStep1(): void {
    this.isEditingStep1 = true;
  }
  saveStep1Changes(): void {
    localStorage.setItem('step1Content', this.step1Content);
    this.isEditingStep1 = false;
  }
  cancelStep1Editing(): void {
    this.loadStep1ContentFromLocalStorage();
    this.isEditingStep1 = false;
  }
  loadStep1ContentFromLocalStorage(): void {
    this.step1Content = localStorage.getItem('step1Content') || this.step1Content;
  }
  startEditingStep2(): void {
    this.isEditingStep2 = true;
  }
  saveStep2Changes(): void {
    localStorage.setItem('step2Content', this.step2Content);
    this.isEditingStep2 = false;
  }
  cancelStep2Editing(): void {
    this.loadStep2ContentFromLocalStorage();
    this.isEditingStep2 = false;
  }
  loadStep2ContentFromLocalStorage(): void {
    this.step2Content = localStorage.getItem('step2Content') || this.step2Content;
  }
  startEditingStep3(): void {
    this.isEditingStep3 = true;
  }
  saveStep3Changes(): void {
    localStorage.setItem('step3Content', this.step3Content);
    this.isEditingStep3 = false;
  }
  cancelStep3Editing(): void {
    this.loadStep3ContentFromLocalStorage();
    this.isEditingStep3 = false;
  }
  loadStep3ContentFromLocalStorage(): void {
    this.step3Content = localStorage.getItem('step3Content') || this.step3Content;
  }
  startEditingStep4(): void {
    this.isEditingStep4 = true;
  }
  saveStep4Changes(): void {
    localStorage.setItem('step4Content', this.step4Content);
    this.isEditingStep4 = false;
  }
  cancelStep4Editing(): void {
    this.loadStep4ContentFromLocalStorage();
    this.isEditingStep4 = false;
  }
  loadStep4ContentFromLocalStorage(): void {
    this.step4Content = localStorage.getItem('step4Content') || this.step4Content;
  }
  startEditingStep5(): void {
    this.isEditingStep5 = true;
  }
  saveStep5Changes(): void {
    localStorage.setItem('step5Content', this.step5Content);
    this.isEditingStep5 = false;
  }
  cancelStep5Editing(): void {
    this.loadStep5ContentFromLocalStorage();
    this.isEditingStep5 = false;
  }
  loadStep5ContentFromLocalStorage(): void {
    this.step5Content = localStorage.getItem('step5Content') || this.step5Content;
  }
  startEditingHistory(): void {
    this.isEditingHistory = true;
  }
  saveHistoryChanges(): void {
    if (typeof this.historyContent === 'string') {
      localStorage.setItem('historyContent', this.historyContent);
    }
    this.isEditingHistory = false;
  }
  cancelHistoryEditing(): void {
    this.loadHistoryContentFromLocalStorage();
    this.isEditingHistory = false;
  }
  loadHistoryContentFromLocalStorage(): void {
    this.historyContent = localStorage.getItem('historyContent') || this.historyContent;
  }
  startEditingCycle(): void {
    this.isEditingCycle = true;
  }
  saveCycleChanges(): void {
    if (typeof this.cycleContent === 'string') {
      localStorage.setItem('cycleContent', this.cycleContent);
    }
    this.isEditingCycle = false;
  }
  cancelCycleEditing(): void {
    this.loadCycleContentFromLocalStorage();
    this.isEditingCycle = false;
  }
  loadCycleContentFromLocalStorage(): void {
    this.cycleContent = localStorage.getItem('cycleContent') || this.cycleContent;
  }
  switchTitles() {
    setTimeout(() => {
      this.fadeIn = true;
      setTimeout(() => {
        this.fadeIn = false;

        setTimeout(() => {
          this.currentTitleIndex = (this.currentTitleIndex + 1) % this.titles.length; // Switch to next title
          this.switchTitles();
        }, 500);
      }, 3500);
    }, 200);
  }

  get currentTitle(): string {
    return this.titles[this.currentTitleIndex];
  }

  handleButtonClick(): void {
    // Implement the functionality you want when the button is clicked
    // Add your logic here
  }
}
