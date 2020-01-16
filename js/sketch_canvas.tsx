import * as React from 'react';
import p5 from 'p5';

const DRAW_INTERVAL = 1;

export class SketchCanvas extends React.Component<{strokes: number[][], sketchingComplete: () => void}, {}> {
    divRef: React.RefObject<HTMLDivElement>;
    start_draw = false;
    prev_strokes = [] as any[];
    start_x = 0;
    start_y = 0;
    // delete_change = false;

    constructor(props) {
        super(props);
        this.divRef = React.createRef();
    }

    restart() {

    }

    async componentDidMount() {
        console.log(this.divRef);
        this.start_draw = true;
        var strokes = this.props.strokes;
        this.draw_sketch();
    }

    async componentDidUpdate(prevProps) {
        if (this.props.strokes !== prevProps.strokes) {
            this.start_draw = true;
            this.prev_strokes = prevProps.strokes;
            this.restart();
        }
    }
    
    draw_sketch() {
        const div_elem = this.divRef.current!;
        let myp5 = new p5((p: p5) => {
            var prev_pen;
            var counter = 0;
            var x, y; // absolute coordinates on the screen of where the pen is
            var strokes;

            var draw_idx = 0;

            var line_color;
            var stroke_width = 1.0;

            var screen_width, screen_height;
            
            this.restart = () => {
                restart();
                // clear_screen();
            }

            p.setup = () => {
                init();
                restart();
                p.createCanvas(screen_width, screen_height);
                p.frameRate(60);
                clear_screen();
                recalc_origin();
            };
            
            
            p.draw = () => {
                strokes = this.props.strokes;
                draw_next();
                counter++;
            };

            var start_drawing = (start_x, start_y) => {
                x = start_x;
                y = start_y;
                prev_pen = [0, 1, 0];
            }

            var draw_stroke = (stroke) => {
                var [dx, dy, pen_down, pen_up, pen_end] = stroke;
                
                if (prev_pen[2] == 1) { // end of drawing.
                    return;
                }
                // only draw on the paper if the pen is touching the paper
                if (prev_pen[0] == 1) {
                    p_stroke(x, y, dx, dy);
                }
        
                // update the absolute coordinates from the offsets
                x += dx;
                y += dy;
        
                // update the previous pen's state to the current one we just sampled
                prev_pen = [pen_down, pen_up, pen_end];
            }



            var p_stroke = (x, y, dx, dy) => {
                p.stroke(p.color(200, 0, 0, 200));
                p.strokeWeight(stroke_width);
                p.line(x, y, x+dx, y+dy); 
            }

            var draw_next = () => {
                //clear_screen();
                if (counter % DRAW_INTERVAL == 0 && this.start_draw && draw_idx < strokes.length) {
                    clear_screen();
                    start_drawing(this.start_x, this.start_y);

                    line_color = p.color(50, 50, 50);
                    for (var i = 0; i <= draw_idx; i++) {
                        draw_stroke(strokes[i]);
                    }

                    draw_idx++;

                    if (draw_idx == strokes.length) {
                        // user_strokes = [];
                        strokes[draw_idx - 1][4] = 0;
                        strokes[draw_idx - 1][3] = 1;
                        this.props.sketchingComplete();
                    }
                }
            };

            var clear_screen = () => {
                p.background(255, 255, 255, 255);
                p.fill(255, 255, 255, 255);
            };

            var init = () => {
                screen_width = this.divRef.current!.clientWidth; //window.innerWidth
                screen_height = screen_width * 0.8;
            };
    
            var restart = () => {
                // reinitialize variables before calling p5.js setup.

                // variables for the sketch input interface.
                strokes = this.props.strokes;
                draw_idx = 0;

                start_drawing(this.start_x, this.start_y);
                
            };

            var recalc_origin = () => {
                var x = 0;
                var y = 0;
                var min_x = Number.MAX_VALUE;
                var min_y = Number.MAX_VALUE;
                var max_x = Number.MIN_VALUE;
                var max_y = Number.MIN_VALUE;
                var strokes = this.props.strokes;
                for (var i = 0; i < strokes.length; i++) {
                    x += strokes[i][0];
                    min_x = Math.min(min_x, x);
                    max_x = Math.max(max_x, x);
                    y += strokes[i][1];
                    min_y = Math.min(min_y, y);
                    max_y = Math.max(max_y, y);
                }
                console.log(min_x, max_x, min_y, max_y);
                var scale = Math.min((screen_width - 20)/(max_x - min_x), (screen_width * 0.8)- 20/(max_y - min_y)); 
                
                for (var i = 0; i < strokes.length; i++) {
                    strokes[i][0] *= scale;
                    strokes[i][1] *= scale;
                }
                
                if (min_x * scale <= 0) {
                    this.start_x = -min_x * scale + 10;
                    console.log(this.start_x);
                }
                if (max_x * scale >= screen_width) {
                    this.start_x -= min_x * scale - 10;
                    console.log(this.start_x);
                }
                if (min_y * scale <= 0) {
                    this.start_y = -min_y * scale + 10;
                    console.log(this.start_y);
                }
                if (max_y * scale >= screen_width * 0.8) {
                    this.start_y -= min_y * scale - 10
                    console.log(this.start_y);
                }
                
            }
        }, div_elem);   
    };

    render() {
        return (
            <div ref={this.divRef}>
            </div>
        )
    }   
}